import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() body: any): Promise<any> {
    return await this.authService.signIn(body);
  }

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    await this.authService.signUp(body);
  }
}
