import { OmitType, PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsNotEmpty } from 'class-validator'

import { UserEntity } from '@/users/entities/user.entity'

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}

export class UpdateUserDTO extends OmitType(PartialType(UserEntity), ['password']) {}
