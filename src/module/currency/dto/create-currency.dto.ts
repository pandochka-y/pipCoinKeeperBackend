import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCurrencyDto {
  @IsNotEmpty({ message: 'Currency name cannot be empty' })
  @ApiProperty({ example: 'RUB', description: 'Currency code' })
  readonly code: string
}
