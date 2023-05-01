import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateMerchantCodeDto {
  @IsNotEmpty({ message: 'Merchant Category Code cannot be empty' })
  @ApiProperty({ example: '4231', description: 'Merchant Category Code' })
  readonly code: number
}
