import { Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(body: CreateDTO) {
    const data = this.userRepo.create(body);
    return await this.userRepo.save(data);
  }
}
