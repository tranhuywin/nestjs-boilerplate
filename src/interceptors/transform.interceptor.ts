import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IResponse<T> {
  statusCode: number
  message: string
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data.status === true) {
          context.switchToHttp().getResponse().statusCode = HttpStatus.OK
        }
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: data.data,
        }
      }),
    )
  }
}
