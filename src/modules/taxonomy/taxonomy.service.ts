import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tree, TreeDocument } from 'src/model/tree.schema';
import { ListDto } from './dto/list.dto';

@Injectable()
export class TaxonomyService {
  constructor(
    @InjectModel(Tree.name)
    private readonly treeModel: Model<TreeDocument>,
  ) {}

  async findList(listDto: ListDto) {
    const { current, pageSize, sortby, order, ...filter } = listDto;
    const data = await this.treeModel
      .find(filter)
      .skip(current * pageSize)
      .limit(pageSize)
      .sort({ [sortby]: order });
    const total = await this.treeModel.countDocuments(filter);
    return {
      code: 200,
      data,
      total,
    };
  }

  async find(id: string) {
    return this.treeModel.findOne({ id });
  }
}
