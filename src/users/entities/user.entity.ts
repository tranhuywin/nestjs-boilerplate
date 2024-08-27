import { genSalt, hash } from 'bcrypt'
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity } from 'typeorm'

import { AbstractEntity } from '@/core/abstract.entity'

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  fullName: string

  @Column({ nullable: true })
  phoneNumber: string

  @DeleteDateColumn()
  deletedAt: Date

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword = async (): Promise<void> => {
    if (!this.password) {
      return
    }
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
  }
}
