import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VegetablesService } from './vegetables.service';
import { VegetablesController } from './vegetables.controller';
import { Vegetable, VegetableSchema } from './schemas/vegetable.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vegetable.name, schema: VegetableSchema }]),
  ],
  controllers: [VegetablesController],
  providers: [VegetablesService],
  exports: [VegetablesService],
})
export class VegetablesModule {}
