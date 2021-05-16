import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaxonomyModule } from './taxonomy/taxonomy.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://kuanghb:249875@localhost:27017', {
      dbName: 'organism_guide',
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    TaxonomyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
