import { EmailField, PasswordField } from '@/decorators'

export class CreateUserDTO {
  @EmailField()
  email: string

  @PasswordField()
  password: string
}
