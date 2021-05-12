import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryListDto } from 'src/dto/query-list.dto';
import {
  QueryListRes,
  ResponseInterface,
} from 'src/interface/respones.interface';
import { Taxonomy } from 'src/schemas/taxonomy.schema';
import { CreateTaxonomyDto } from './dto/create-taxonomy.dto';
import { UpdateTaxonomyDto } from './dto/update-taxonomy.dto';
import { TaxonomyService } from './taxonomy.service';

@Controller('taxonomy')
@ApiTags('分类')
export class TaxonomyController {
  constructor(private taxonomyService: TaxonomyService) {}

  @Get('list')
  @ApiOperation({ summary: '查询分类列表', operationId: 'list' })
  // @ApiQuery({
  //   type: QueryListDto,
  //   required: false,
  //   description: '查询条件',
  // })
  async findAll(
    @Query() query: QueryListDto,
  ): Promise<ResponseInterface<QueryListRes<Taxonomy>>> {
    return {
      code: 200,
      data: await this.taxonomyService.findAll(query),
      msg: '查询成功',
    };
  }

  @Get(':_id')
  @ApiOperation({ summary: '查询分类' })
  async findOne(
    @Param('_id') _id: string,
  ): Promise<ResponseInterface<Taxonomy>> {
    return {
      code: 200,
      data: await this.taxonomyService.findOne(_id),
      msg: '查询成功',
    };
  }

  @Post()
  @ApiOperation({ summary: '新增分类' })
  async create(
    @Body() createTaxonomyDto: CreateTaxonomyDto,
  ): Promise<ResponseInterface> {
    await this.taxonomyService.create(createTaxonomyDto);
    return {
      code: 200,
      msg: '创建成功',
    };
  }

  @Put()
  @ApiOperation({ summary: '修改分类' })
  async update(
    @Body() updateTaxonomyDto: UpdateTaxonomyDto,
  ): Promise<ResponseInterface<Taxonomy>> {
    return {
      code: 200,
      data: await this.taxonomyService.update(updateTaxonomyDto),
      msg: '更新成功',
    };
  }

  @Delete(':_id')
  @ApiOperation({ summary: '删除分类' })
  async remove(@Param('_id') _id: string): Promise<ResponseInterface> {
    await this.taxonomyService.remove(_id);
    return {
      code: 200,
      msg: '删除成功',
    };
  }
}
