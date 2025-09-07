import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Vegetable extends Document {
  @Prop({ required: true, trim: true })
  nombre: string; // ej: Zanahoria

  @Prop({ trim: true })
  color?: string; // ej: verde, rojo

  @Prop()
  caloriasPor100g?: number;

  @Prop({ type: [String], default: [] })
  nutrientes?: string[]; // ej: vitamina A, fibra

  @Prop({ enum: ['primavera', 'verano', 'otoño', 'invierno', 'todo_el_año'] })
  temporada?: string;

  @Prop({ default: false })
  esOrganico?: boolean;

  @Prop()
  precioPorKg?: number;
}

export const VegetableSchema = SchemaFactory.createForClass(Vegetable);
