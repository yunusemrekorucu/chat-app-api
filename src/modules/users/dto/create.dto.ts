import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
