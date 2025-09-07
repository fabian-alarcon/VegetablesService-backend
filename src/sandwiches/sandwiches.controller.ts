import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SandwichesService } from './sandwiches.service';
import { CreateSandwichDto } from './schemas/dto/create-sandwich.dto';
import { UpdateSandwichDto } from './schemas/dto/update-sandwich.dto';
import { Sandwich } from './schemas/sandwich.schema';

@Controller('sandwiches')
export class SandwichesController {
  constructor(private readonly sandwichesService: SandwichesService) {}

  @Post()
  create(@Body() createSandwichDto: CreateSandwichDto): Promise<Sandwich> {
    return this.sandwichesService.create(createSandwichDto);
  }

  @Get()
  findAll(): Promise<Sandwich[]> {
    return this.sandwichesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Sandwich> {
    return this.sandwichesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSandwichDto: UpdateSandwichDto): Promise<Sandwich> {
    return this.sandwichesService.update(id, updateSandwichDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Sandwich> {
    return this.sandwichesService.remove(id);
  }
}