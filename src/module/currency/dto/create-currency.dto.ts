import { ApiProperty } from '@nestjs/swagger'

export class CreateCurrencyDto {
  @ApiProperty({ example: 'RUB', description: 'Currency code' })
  readonly code: string
}
