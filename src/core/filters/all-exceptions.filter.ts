import { Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Request, Response } from 'express'
import { QueryFailedError } from 'typeorm'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const message = this.getErrorMessage(exception)

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    })
    super.catch(exception, host)
  }

  private getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      return exception.message
    } else if (exception instanceof QueryFailedError) {
      // Handle TypeORM query failed error
      return 'Database error occurred'
    } else if (exception instanceof Error) {
      return exception.message
    } else {
      return 'Unknown error'
    }
  }
}
