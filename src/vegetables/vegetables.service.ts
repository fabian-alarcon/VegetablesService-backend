import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vegetable } from './schemas/vegetable.schema';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';

@Injectable()
export class VegetablesService {
  constructor(
    @InjectModel(Vegetable.name)
    private readonly vegetableModel: Model<Vegetable>,
  ) {}

  async create(dto: CreateVegetableDto): Promise<Vegetable> {
    const created = new this.vegetableModel(dto);
    return created.save();
  }

  async findAll(query: any = {}): Promise<Vegetable[]> {
    return this.vegetableModel.find(query).exec();
  }

  async findOne(id: string): Promise<Vegetable> {
    const veg = await this.vegetableModel.findById(id).exec();
    if (!veg) {
      throw new NotFoundException(`Vegetal con id ${id} no encontrado`);
    }
    return veg;
  }

  async update(id: string, dto: UpdateVegetableDto): Promise<Vegetable> {
    const updated = await this.vegetableModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Vegetal con id ${id} no encontrado`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.vegetableModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Vegetal con id ${id} no encontrado`);
    }
  }

  async generate({
    cantidad = 5,
    colores,
    temporadas,
    proporcionOrganicos = 0.5,
    rangoCalorias = [10, 80],
    conNutrientes,
  }: {
    cantidad?: number;
    colores?: string[];
    temporadas?: string[];
    proporcionOrganicos?: number;
    rangoCalorias?: [number, number];
    conNutrientes?: string[];
  }): Promise<Vegetable[]> {
    const nombresBase = [
      'Zanahoria','Brócoli','Espinaca','Tomate','Pepino','Pimiento','Cebolla','Ajo',
      'Lechuga','Kale','Coliflor','Zapallo italiano','Berenjena','Calabaza','Betarraga',
      'Rábano','Apio','Espárrago','Arveja','Maíz','Repollo','Puerro','Alcachofa','Quingombó',
      'Camote','Papa','Jengibre','Champiñón','Acelga','Rúcula'
    ];

    const coloresDisponibles = colores || ['verde','rojo','naranja','amarillo','morado','blanco'];
    const temporadasDisponibles = temporadas || ['primavera','verano','otoño','invierno','todo_el_año'];
    const nutrientesDisponibles = conNutrientes || [
      'vitamina A','vitamina C','vitamina K','ácido fólico','potasio','hierro','fibra'
    ];

    const vegetales: Vegetable[] = [];

    for (let i = 0; i < cantidad; i++) {
      const nombre = nombresBase[Math.floor(Math.random() * nombresBase.length)];
      const color = coloresDisponibles[Math.floor(Math.random() * coloresDisponibles.length)];
      const temporada = temporadasDisponibles[Math.floor(Math.random() * temporadasDisponibles.length)];
      const esOrganico = Math.random() < proporcionOrganicos;
      const calorias = Math.floor(
        Math.random() * (rangoCalorias[1] - rangoCalorias[0] + 1)
      ) + rangoCalorias[0];

      const nutrientes = nutrientesDisponibles
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * nutrientesDisponibles.length) + 1);

      vegetales.push(
        new this.vegetableModel({
          nombre,
          color,
          caloriasPor100g: calorias,
          temporada,
          esOrganico,
          nutrientes,
        }),
      );
    }

    return this.vegetableModel.insertMany(vegetales);
  }
}
