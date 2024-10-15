import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsMobilePhone('tr-TR')
  phone: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6, { message: 'En az 6 karakterli olmalıdır' })
  password: string;
}
