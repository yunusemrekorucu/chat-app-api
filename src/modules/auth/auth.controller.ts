import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { BaseResponse } from 'src/_base/base.response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login() {
    return 'login';
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    const isThereEmail = await this.authService.signUp(body);

    if (isThereEmail)
      throw new BadRequestException(
        'Bu email ile zaten bir kullanıcı bulunuyor',
      );

    return new BaseResponse(null, 'Başarıyla kayıt olundu', true);
  }
}
