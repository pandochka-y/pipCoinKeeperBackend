import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCurrencyDto {
  @IsNotEmpty({ message: 'Currency name cannot be empty' })
  @ApiProperty({ example: 'RUB', description: 'Currency code' })
  readonly code: string

  @IsNotEmpty({ message: 'Currency symbol cannot be empty' })
  @ApiProperty({ example: '₽', description: 'Currency code' })
  readonly currency_symbol: string
}
