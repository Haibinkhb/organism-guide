import { ApiProperty } from '@nestjs/swagger';
import { CreateTaxonomyDto } from './create-taxonomy.dto';

export class UpdateTaxonomyDto extends CreateTaxonomyDto {
  @ApiProperty({ required: true, description: '要更新的数据项的id' })
  _id: string;
}
