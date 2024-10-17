import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { BaseResponse } from 'src/_base/base.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: LoginDTO) {
    const user = await this.userService.findOne({ email: body.email });

    const comparedPassword = await this.comparePasswords(
      body?.password,
      user?.password,
    );

    if (!comparedPassword) {
      throw new BadRequestException(
        'Email veya şifrenizi tekrar kontrol ediniz.',
      );
    }

    const payload = { email: user.email };
    return {
      user: {
        email: user.email,
        avatar: '',
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(body: RegisterDTO) {
    const isThereEmail = await this.userService.findOne({ email: body.email });
    const isTherePhone = await this.userService.findOne({ phone: body.phone });

    if (isThereEmail) {
      throw new BadRequestException(
        'Bu email ile zaten bir kullanıcı bulunuyor',
      );
    } else if (isTherePhone) {
      throw new BadRequestException(
        'Bu telefon numarası ile zaten bir kullanıcı bulunuyor',
      );
    }
    const hashedPassword = await this.hashPassword(body.password);
    console.log(hashedPassword);
    const user = { ...body, password: hashedPassword };
    await this.userService.addUser(user);
    return new BaseResponse(null, 'Başarıyla kayıt olundu', true);
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async comparePasswords(plainPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
