import { Module } from '@nestjs/common';
import { TaxonomyService } from './taxonomy.service';
import { TaxonomyController } from './taxonomy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tree, TreeSchema } from 'src/model/tree.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ schema: TreeSchema, name: Tree.name }]),
  ],
  providers: [TaxonomyService],
  controllers: [TaxonomyController],
})
export class TaxonomyModule {}
