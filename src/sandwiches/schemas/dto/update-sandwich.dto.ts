import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateSandwichDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  ingredients?: string;
}