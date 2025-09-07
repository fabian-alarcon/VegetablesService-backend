import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sandwich, SandwichDocument } from './schemas/sandwich.schema';
import { CreateSandwichDto } from './schemas/dto/create-sandwich.dto';
import { UpdateSandwichDto } from './schemas/dto/update-sandwich.dto';

@Injectable()
export class SandwichesService {
  constructor(@InjectModel(Sandwich.name) private sandwichModel: Model<SandwichDocument>) {}

  async create(createSandwichDto: CreateSandwichDto): Promise<Sandwich> {
    const sandwich = new this.sandwichModel(createSandwichDto);
    return sandwich.save();
  }

  async findAll(): Promise<Sandwich[]> {
    return this.sandwichModel.find().exec();
  }

  async findOne(id: string): Promise<Sandwich> {
    return this.sandwichModel.findById(id).exec();
  }

  async update(id: string, updateSandwichDto: UpdateSandwichDto): Promise<Sandwich> {
    return this.sandwichModel.findByIdAndUpdate(id, updateSandwichDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Sandwich> {
    return this.sandwichModel.findByIdAndDelete(id).exec();
  }
}