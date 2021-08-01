import axios from 'axios';
import * as cheerio from 'cheerio';
import { Model } from 'mongoose';
import { AnimaliaTreeDocument } from 'src/model/animaliaTree';
import { formUrlEncoded, sleep } from 'src/utils';
const baseUrl = 'http://www.sp2000.org.cn/browse/taxa_tree_children';
const detailUrl = 'http://www.sp2000.org.cn/species/show_species_details';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'X-CSRF-TOKEN': '59dc799f-726c-4752-8df7-57678736227f',
  Cookie: 'JSESSIONID=2A18F58F241C515679376E1CA3C97F8E',
};
const proxy = {
  host: '60.245.211.109',
  port: 80,
};
interface queryParams {
  id: string;
  lv: number;
  name: string;
  otherParam: string;
}

interface reslutItem {
  id: string;
  name: string;
  isParent: boolean;
  lv?: number;
  ancestors?: string[];
  parentId?: string;
  [key: string]: any;
}
interface placeReslut {
  cnPlaceName: string;
  enPlaceName: string;
}

interface nameInfo {
  cnName: string;
  enName: string;
  expertInfoLink: string;
  expertName: string;
}

type ModeDocument = AnimaliaTreeDocument;

export class Crawl {
  constructor(model: Model<ModeDocument>) {
    this.model = model;
  }
  private readonly model: Model<ModeDocument>;
  private list = [];
  private count = 0;

  async saveData(arr: reslutItem[], lv: number, ancestors: string[]) {
    for (let i = 0; i < arr.length; i++) {
      console.log(this.count++);
      try {
        const item = arr[i];
        const { id, name, isParent } = item;
        item.lv = lv + 1;
        item.ancestors = ancestors;
        const { expertInfoLink, expertName, cnName, enName } =
          await this.getNameInfo(name);
        const treeNode = {
          ...item,
          expertInfoLink,
          expertName,
          cnName,
          enName,
        };
        this.list.push(treeNode);
        if (this.list.length === 500) {
          await this.model.insertMany(this.list);
          this.list = [];
          console.log('inster ===========================');
        }
        // const tree = await this.model.find({ id });
        // if (!tree || !tree.length) {
        //   await this.model.create(treeNode);
        // }
        if (isParent) {
          const params = {
            id,
            name,
            lv,
            otherParam: 'zTreeAsyncTest',
          };
          const data = await this.fetchData(params);
          data.forEach((d) => {
            if (d.lv !== 0) {
              d.parentId = item.id;
            }
          });
          const parentIds = [...ancestors, item.id];
          await this.saveData(data, lv + 1, parentIds);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async getNameInfo(name: string): Promise<nameInfo> {
    let reg: RegExp;
    let expertInfoLink = '';
    let expertName = '';
    let cnName = '';
    let enName = '';
    let matchData: RegExpMatchArray;
    if (name.indexOf('<font') > -1) {
      if (name.indexOf('Genus') > -1) {
        reg = /(.*?)<font.*?>(.*?)<.*?>(.*?)\(.*?/;
        const matchData = name.match(reg);
        enName = matchData[1].trim() + ' ' + matchData[2].trim();
        cnName = matchData[3].trim();
      } else {
        reg =
          /<font class='text-species-a'>(.*?)<\/.*?<font class='text-species'>(.*?)<\/.*?<a.*?href="(.*?)".*?>(.*?)<\/.*?/;
        const matchData = name.match(reg);
        enName = matchData[1];
        cnName = matchData[2];
        expertInfoLink = matchData[3];
        expertName = matchData[4];
      }
    } else {
      if (name.indexOf('<a') > -1) {
        matchData = name.match(/(.*?)\(.*?<a.*?href="(.*?)".*?>(.*?)<\/a>/);
      } else {
        matchData = name.match(/(.*?)\(.*?/);
      }
      const length = matchData.length;
      const names = matchData[1].split('\t');
      cnName = names.pop();
      enName = names.join(' ');
      if (length === 4) {
        expertInfoLink = matchData[2];
        expertName = matchData[3];
      }
    }
    return { expertInfoLink, expertName, cnName, enName };
  }

  async fetchData(params: queryParams): Promise<reslutItem[]> {
    try {
      const res = await axios({
        url: baseUrl,
        method: 'post',
        data: formUrlEncoded(params),
        headers,
        proxy,
      });
      return res.data;
    } catch (error) {
      console.error('error');
    }
  }

  async updateLv$lte4Data() {
    const data = await this.model.find({ lv: { $lte: 4 } });
    for (let i = 0; i < data.length; i++) {
      try {
        const { name, id } = data[i];
        let expertInfoLink = '';
        let expertName = '';
        let cnName = '';
        let enName = '';
        let matchData: string[];
        if (name.indexOf('<a') > -1) {
          matchData = name.match(/(.*?)\(.*?<a.*?href="(.*?)".*?>(.*?)<\/a>/);
          return;
        } else {
          matchData = name.match(/(.*?)\(.*?/);
        }
        const length = matchData.length;
        const names = matchData[1].split('\t');
        cnName = names.pop();
        enName = names.join(' ');
        if (length === 4) {
          expertInfoLink = matchData[2];
          expertName = matchData[3];
        }
        await this.model.findOneAndUpdate(
          { id },
          { $set: { expertInfoLink, expertName, cnName, enName } },
        );
      } catch (error) {
        console.error(error);
      }
    }
    console.log('end ================');
  }

  async updateLv$gt4Data() {
    const data = await this.model.find({ lv: { $gt: 4 } });
    for (let i = 0; i < data.length; i++) {
      const { name, id, isParent, enName } = data[i];
      if (enName) return;
      console.log(this.count++);
      try {
        let reg: RegExp;
        let expertInfoLink = '';
        let expertName = '';
        let cnName = '';
        let enName = '';
        if (isParent) {
          reg = /(.*?)<font.*?>(.*?)<.*?>(.*?)\(.*?/;
          const matchData = name.match(reg);
          enName = matchData[1].trim() + ' ' + matchData[2].trim();
          cnName = matchData[3].trim();
        } else {
          reg =
            /<font class='text-species-a'>(.*?)<\/.*?<font class='text-species'>(.*?)<\/.*?<a.*?href="(.*?)".*?>(.*?)<\/.*?/;
          const matchData = name.match(reg);
          enName = matchData[1];
          cnName = matchData[2];
          expertInfoLink = matchData[3];
          expertName = matchData[4];
        }
        await this.model.findOneAndUpdate(
          { id },
          { $set: { expertInfoLink, expertName, cnName, enName } },
        );
      } catch (error) {
        console.error(error);
      }
    }
    console.log('end ================');
  }

  async getPlaceInfo() {
    const animals = await this.model.find({
      isParent: false,
      enPlaceName: { $eq: null },
    });
    for (let i = 0; i < animals.length; i++) {
      try {
        console.log(this.count++);
        const { id } = animals[i];
        if (animals[i].enPlaceName) continue;
        const distributionPlace = await this.getDistributionPlace(id);
        const { cnPlaceName, enPlaceName } = distributionPlace;
        await this.model.findOneAndUpdate(
          { id },
          {
            $set: { cnPlaceName, enPlaceName },
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  async getDistributionPlace(id: string): Promise<placeReslut> {
    const reslut = { cnPlaceName: '', enPlaceName: '' };
    try {
      const res = await axios({
        url: `${detailUrl}/${id}`,
        method: 'get',
        headers,
        proxy,
      });
      const $ = cheerio.load(res.data, { ignoreWhitespace: true });
      const table = $('.table');
      const td = table.find('td');
      td.each(function (index, element) {
        const text = $(this).text();
        if (text.indexOf('分布地') <= -1) return;
        const parent = element.parent;
        if (parent.type !== 'tag') return;
        const parentChildren = parent.children.filter((i) => i.type === 'tag');
        const target = parentChildren[parentChildren.length - 1];
        if (target.type !== 'tag') return;
        const targetChildren = target.children;
        const current = targetChildren.filter((i) => i.type === 'tag')[0];
        if (current.type !== 'tag') return;
        const currentChild = current.children[0];
        if (currentChild.type !== 'text') return;
        const data = currentChild.data;
        if (text.indexOf('中文') > -1) {
          reslut.cnPlaceName = data;
        } else {
          reslut.enPlaceName = data;
        }
      });
    } catch (error) {
      console.error(error);
    }
    return reslut;
  }
}
