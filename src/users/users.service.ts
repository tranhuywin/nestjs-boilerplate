import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UpdateUserDTO } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async create({ email, password }: Pick<User, 'email' | 'password'>): Promise<User> {
    const isUserExist = await this.findOneByEmail(email);
    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }
    const user = new User();
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  async updateUser(email: string, data: UpdateUserDTO) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const updatedUser = this.userRepository.create({ ...user, ...data });
    return this.userRepository.save(updatedUser);
  }
}
