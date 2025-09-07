import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSandwichDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ingredients: string;
}
