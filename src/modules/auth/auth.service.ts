import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  //   async signIn(
  //     username: string,
  //     pass: string,
  //   ): Promise<{ access_token: string }> {
  //     const user = await this.userRepo.findOne(username);
  //     if (user?.password !== pass) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user.userId, username: user.username };
  //     return {
  //       access_token: await this.jwtService.signAsync(payload),
  //     };
  //   }

  async signUp(body: RegisterDTO) {
    const users = await this.userService.getUsers();
    const isThereEmail = users.find((user) => user.email === body.email);
    if (!isThereEmail) await this.userService.addUser(body);

    return isThereEmail;
  }
}
