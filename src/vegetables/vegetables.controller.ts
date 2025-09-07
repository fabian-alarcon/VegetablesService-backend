import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VegetablesService } from './vegetables.service';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';

@Controller('vegetales')
export class VegetablesController {
  constructor(private readonly service: VegetablesService) {}

  @Post()
  crear(@Body() dto: CreateVegetableDto) {
    return this.service.create(dto);
  }

  @Get()
  listar(@Query() query: any) {
    return this.service.findAll(query);
  }

  @Get(':id')
  obtener(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  actualizar(@Param('id') id: string, @Body() dto: UpdateVegetableDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('generar')
  generar(@Body() body: any) {
    return this.service.generate(body || {});
  }
}
