import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger'

import { getVariableName } from '@/core/utils'

export function ApiBooleanProperty(
  options: Omit<ApiPropertyOptions, 'type'> = {},
): PropertyDecorator {
  return ApiProperty({ type: Boolean, ...options })
}

export function ApiBooleanPropertyOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'required'> = {},
): PropertyDecorator {
  return ApiBooleanProperty({ required: false, ...options })
}

export function ApiUUIDProperty(
  options: Omit<ApiPropertyOptions, 'type' | 'format'> & Partial<{ each: boolean }> = {},
): PropertyDecorator {
  return ApiProperty({
    type: options.each ? [String] : String,
    format: 'uuid',
    isArray: options.each,
    ...options,
  })
}

export function ApiUUIDPropertyOptional(
  options: Omit<ApiPropertyOptions, 'type' | 'format' | 'required'> &
    Partial<{ each: boolean }> = {},
): PropertyDecorator {
  return ApiUUIDProperty({ required: false, ...options })
}

export function ApiEnumProperty<
  TEnum extends any[] | Record<string, any> | (() => any[] | Record<string, any>) | undefined,
>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type'> & { each?: boolean } = {},
): PropertyDecorator {
  const enumValue = getEnum()

  return ApiProperty({
    type: 'enum',
    enum: enumValue,
    enumName: getVariableName(getEnum),
    ...options,
  })
}

export function ApiEnumPropertyOptional<
  TEnum extends any[] | Record<string, any> | (() => any[] | Record<string, any>) | undefined,
>(
  getEnum: () => TEnum,
  options: Omit<ApiPropertyOptions, 'type' | 'required'> & {
    each?: boolean
  } = {},
): PropertyDecorator {
  return ApiEnumProperty(getEnum, { required: false, ...options })
}
