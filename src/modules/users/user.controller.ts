import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/_base/base.response';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async get() {
    const data = await this.userService.getUsers();
    return new BaseResponse(data, 'Kullanıcılar başarıyla çekildi.', true);
  }
}
