import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
