import { ApiProperty } from '@nestjs/swagger';

export class QueryListDto {
  @ApiProperty({
    required: false,
    description: '查询条件',
    example: { where: { "cn_name": '植物界' } }, // prettier-ignore
  })
  where?: any;

  @ApiProperty({
    required: false,
    description: '查询数量',
    example: 10,
  })
  limit?: number;

  @ApiProperty({
    required: false,
    description: '当前查询页数（从 0 开始）',
    example: 0,
  })
  page?: number;

  skip?: number;

  @ApiProperty({
    required: false,
    description: '排序方式 { 字段名: 1 } (1升序，-1降序)',
    example: { "createAt": 1 }, // prettier-ignore
  })
  sort?: string | any;
  populate?: string | any;
  select?: string | any;
  collation?: string | any;
}
