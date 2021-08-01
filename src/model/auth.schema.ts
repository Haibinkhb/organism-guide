import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  salt: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
