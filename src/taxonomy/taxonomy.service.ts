import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryListDto } from 'src/dto/query-list.dto';
import { QueryListRes } from 'src/interface/respones.interface';
import { Taxonomy, TaxonomyDocument } from 'src/schemas/taxonomy.schema';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { UpdateTaxonomyDto } from './dto/update-taxonomy.dto';

@Injectable()
export class TaxonomyService {
  constructor(
    @InjectModel(Taxonomy.name)
    private readonly taxonomy: Model<TaxonomyDocument>,
  ) {}

  async findAll(query: QueryListDto): Promise<QueryListRes<Taxonomy>> {
    const {
      where = {},
      populate = undefined,
      sort = { createAt: 1 },
      collation = undefined,
    } = query;
    const page = query?.page ? Number(query.page) : 0;
    const limit = query?.limit ? Number(query.limit) : 10;
    const skip = Number(query?.skip) > 0 ? Number(query?.skip) : page * limit;
    const data = await this.taxonomy
      .find()
      .where(where)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate(populate)
      .collation(collation);
    const total = await this.taxonomy.countDocuments(where);
    return {
      data,
      total,
    };
  }

  async findOne(_id: string): Promise<Taxonomy> {
    return await this.taxonomy.findById(_id);
  }

  async create(createTaxonomyDto: CreateTaxonomyDto): Promise<Taxonomy> {
    return await this.taxonomy.create(createTaxonomyDto);
  }

  async update(updateTaxonomyDto: UpdateTaxonomyDto): Promise<Taxonomy> {
    const { _id } = updateTaxonomyDto;
    return await this.taxonomy.findByIdAndUpdate(_id, updateTaxonomyDto);
  }

  async remove(_id: string): Promise<unknown> {
    const ids = _id.split(',');
    return await this.taxonomy.deleteMany({ _id: { $in: [...ids] } });
  }
}
