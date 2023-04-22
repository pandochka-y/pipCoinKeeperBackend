import { ApiProperty } from '@nestjs/swagger'

export class CreateMerchantCodeDto {
  @ApiProperty({ example: '4231', description: 'Merchant Category Code' })
  readonly code: number
}
