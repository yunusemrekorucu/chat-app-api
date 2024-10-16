import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getUsers() {
    return await this.userRepo.find();
  }

  async addUser(body: any) {
    return await this.userRepo.save(body);
  }

  async findOne(body: any) {
    return await this.userRepo.findOne({ where: body });
  }
}
