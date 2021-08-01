import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantaeTreeDocument = PlantaeTree & Document;

@Schema({ timestamps: true })
export class PlantaeTree extends Document {
  @Prop({ required: false })
  font: string | null;

  @Prop()
  id: string;

  @Prop()
  cnName: string; // 中文名

  @Prop()
  enName: string; // 英文名

  @Prop({ required: false }) // 分布地中文名
  cnPlaceName: string;

  @Prop({ required: false })
  enPlaceName: string; // 分布地英文名

  @Prop({ required: false })
  expertName: string; // 专家名称

  @Prop({ required: false })
  expertInfoLink: string; // 专家信息链接

  @Prop({ required: false })
  parentId: string;

  @Prop()
  isParent: boolean;

  @Prop()
  name: string;

  @Prop({ required: false })
  url: string | null;

  @Prop()
  pinyin: string;

  @Prop()
  right: boolean;

  @Prop()
  lv: number;

  @Prop({ required: false })
  target: string | null;

  @Prop({ required: true })
  ancestors: string[];
}

export const PlantaeTreeSchema = SchemaFactory.createForClass(PlantaeTree);
