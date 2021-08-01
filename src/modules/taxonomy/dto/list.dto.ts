import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ListDto {
  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'current 必须是 number 类型' })
  current = 0;

  @IsNumber({}, { message: 'pageSize 必须是 number 类型' })
  @Transform(({ value }) => Number(value))
  pageSize = 10;

  @IsString({ message: 'sortby 必须是 string 类型' })
  sortby: 'createAt';

  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'order 必须是 number 类型' })
  order: -1;

  @Transform(({ value }) => Number(value))
  @IsNumber({}, { message: 'lv 必须是 number 类型' })
  lv: number;

  @Transform(({ value }) => JSON.parse(value))
  @IsBoolean({ message: 'isParent 必须是 boolean 类型' })
  isParent: boolean;
}
