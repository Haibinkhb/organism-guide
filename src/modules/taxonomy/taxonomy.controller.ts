import { Param, Query } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { ListDto } from './dto/list.dto';
import { TaxonomyService } from './taxonomy.service';

@ApiTags('Taxonomy')
@Controller('taxonomy')
export class TaxonomyController {
  constructor(private readonly taxonomyService: TaxonomyService) {}

  @Get()
  @ApiQuery({
    name: 'filters',
    schema: {
      type: 'object',
      example: {
        lv: 0,
        isParent: true,
        pageSize: 10,
        current: 0,
        sortby: 'createAt',
        order: -1,
      },
    },
  })
  async findList(@Query(new ValidationPipe()) listDto: ListDto) {
    return this.taxonomyService.findList(listDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.taxonomyService.find(id);
  }
}
