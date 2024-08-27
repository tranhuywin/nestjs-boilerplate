import type { ArgumentsHost } from '@nestjs/common'
import { Catch, BadRequestException } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import type { ValidationError } from 'class-validator'
import type { Response } from 'express'
import { isEmpty } from 'lodash'

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends BaseExceptionFilter<BadRequestException> {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const statusCode = exception.getStatus()
    const r = exception.getResponse() as { message: ValidationError[] }
    const validationErrors = r.message
    this.validationFilter(validationErrors)

    response.status(statusCode).json(r)
  }

  private validationFilter(validationErrors: ValidationError[]): void {
    for (const validationError of validationErrors) {
      const children = validationError.children

      if (children && !isEmpty(children)) {
        this.validationFilter(children)
        return
      }

      delete validationError.children

      const constraints = validationError.constraints

      if (!constraints) {
        return
      }
    }
  }
}
