import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'

import { AbstractService } from '@/core/abstract.services'

import { UserEntity } from './entities/user.entity'
import { UpdateUserDTO } from './interfaces/user.interface'

@Injectable()
export class UsersService extends AbstractService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository)
  }

  @Transactional()
  async create({ email, password }: Pick<UserEntity, 'email' | 'password'>): Promise<UserEntity> {
    const isUserExist = await this.findOneBy({ email })
    if (isUserExist) {
      throw new BadRequestException('User already exists')
    }
    const user = new UserEntity()
    user.email = email
    user.password = password
    return this.userRepository.save(user)
  }

  async updateUser(email: string, data: UpdateUserDTO): Promise<UserEntity> {
    const user = await this.findOneBy({ email })
    if (!user) {
      throw new BadRequestException('User not found')
    }

    const updatedUser = this.userRepository.create({ ...user, ...data })
    return this.userRepository.save(updatedUser)
  }
}
