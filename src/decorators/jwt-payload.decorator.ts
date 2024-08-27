import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { IJwtPayload } from '@/auth/interfaces/auth.interface'

export const JwtPayload = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.jwtPayload as IJwtPayload
})
