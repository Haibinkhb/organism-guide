import { ApiProperty } from '@nestjs/swagger';

export class CreateTaxonomyDto {
  @ApiProperty({
    required: true,
    description: '生物分类中文名称（界门纲目科属种）',
    example: '海豚科',
  })
  cn_name: string;

  @ApiProperty({
    required: true,
    description: '父级分类类型',
    example: '偶蹄目_id',
  })
  parent: string;

  @ApiProperty({
    required: true,
    description: '祖先分类类型',
    example: '["动物界_id","脊索动物门_id","哺乳纲_id","偶蹄目_id"]',
  })
  ancestors: string[];

  @ApiProperty({
    required: false,
    description: '生物分类英文名称（界门纲目科属种）',
    example: 'Delphinidae',
  })
  en_name?: string;

  @ApiProperty({
    required: false,
    description: '类型描述',
    example:
      '是跟黑猩猩一样聪明的动物，许多杂技表演都有海豚。它还可以创造杂技，模仿人鼓掌的动作等。',
  })
  description?: string;

  @ApiProperty({
    required: false,
    description: '类型图片地址',
    example: '',
  })
  img_url?: string;
}
