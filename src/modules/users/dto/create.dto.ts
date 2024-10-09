import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateDTO {
  @IsNotEmpty({ message: 'İsim boş olamaz' })
  @IsEmail({}, { message: 'Email alanı geçerli değil' })
  email: string;
  @IsNotEmpty({ message: 'Password boş olamaz' })
  @MinLength(6, { message: 'Şifre 6 karakter`den az olamaz' })
  password: string;
}
