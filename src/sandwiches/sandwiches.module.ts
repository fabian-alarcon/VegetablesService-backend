import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SandwichesService } from './sandwiches.service';
import { SandwichesController } from './sandwiches.controller';
import { Sandwich, SandwichSchema } from './schemas/sandwich.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sandwich.name, schema: SandwichSchema }]),
  ],
  controllers: [SandwichesController],
  providers: [SandwichesService],
  exports: [SandwichesService], // Exporting the service for use in other modules
})
export class SandwichesModule {}