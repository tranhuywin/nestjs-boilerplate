import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { IJwtPayload } from 'src/auth/interfaces/auth.interface';

export const JwtPayload = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.jwtPayload as IJwtPayload;
});
