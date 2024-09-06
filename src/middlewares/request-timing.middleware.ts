import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RequestTimingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now()
    const { method, originalUrl } = req
    const TIME_OUT = 2000

    res.on('finish', () => {
      const duration = Date.now() - start
      if (duration > TIME_OUT) {
        console.warn(`${method} ${originalUrl} ${duration}ms`)
      }
    })
    next()
  }
}
