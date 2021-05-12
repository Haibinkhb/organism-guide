import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaxonomyDocument = Taxonomy & Document;

@Schema({ timestamps: true })
export class Taxonomy extends Document {
  @Prop({ required: true })
  cn_name: string;

  @Prop({ required: true })
  parent: string;

  @Prop({ required: true })
  ancestors: string[];

  @Prop({ required: false })
  en_name?: string;

  @Prop({ required: false })
  img_url?: string;

  @Prop({ required: false })
  description?: string;
}

export const TaxonomySchema = SchemaFactory.createForClass(Taxonomy);
