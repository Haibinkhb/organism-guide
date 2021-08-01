import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/model/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: AuthSchema, name: Auth.name }]),
  ],
  providers: [UserService],
  // controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
