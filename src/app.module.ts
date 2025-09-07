import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VegetablesModule } from './vegetables/vegetables.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/vegetables-db'),
    VegetablesModule,
  ],
})
export class AppModule {}
