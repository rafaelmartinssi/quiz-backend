import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
