import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Taxonomy, TaxonomySchema } from 'src/schemas/taxonomy.schema';
import { TaxonomyController } from './taxonomy.controller';
import { TaxonomyService } from './taxonomy.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: TaxonomySchema, name: Taxonomy.name },
    ]),
  ],
  controllers: [TaxonomyController],
  providers: [TaxonomyService],
})
export class TaxonomyModule {}
