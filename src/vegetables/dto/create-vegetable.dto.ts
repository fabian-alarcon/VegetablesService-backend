import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsArray,
  ArrayUnique,
} from 'class-validator';

export class CreateVegetableDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  caloriasPor100g?: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  nutrientes?: string[];

  @IsOptional()
  @IsIn(['primavera', 'verano', 'otoño', 'invierno', 'todo_el_año'])
  temporada?: 'primavera' | 'verano' | 'otoño' | 'invierno' | 'todo_el_año';

  @IsOptional()
  @IsBoolean()
  esOrganico?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precioPorKg?: number;
}
