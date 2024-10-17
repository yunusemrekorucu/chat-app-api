import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/_base/base.response';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async get() {
    const data = await this.userService.getUsers();
    return new BaseResponse(data, 'Kullanıcılar başarıyla çekildi.', true);
  }
}
