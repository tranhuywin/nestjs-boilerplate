import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'

export const PaginationOptions = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  let originalUrl = req.originalUrl
  const query = req.query
  const urlPart = originalUrl.split('?')
  urlPart[1] = urlPart[1]
    .split('&')
    .filter((item: string) => item.indexOf('page=') === -1 && item.indexOf('limit=') === -1)
    .join('&')
  originalUrl = urlPart.join('?')
  const options: IPaginationOptions = {
    limit: query.limit,
    page: query.page,
    route: originalUrl,
  }

  return options
})
