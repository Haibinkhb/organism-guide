import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.MONGODB_URI,
          useFindAndModify: false,
        };
      },
    }),
  ],
})
export class DbModule {}
