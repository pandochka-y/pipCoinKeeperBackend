import { ApiProperty } from '@nestjs/swagger'

export class CreateTransactionDto {
  @ApiProperty({ example: '123', description: 'User id' })
  readonly user_id: number

  @ApiProperty({ example: '1', description: 'Board id' })
  readonly board_id: number

  @ApiProperty({ example: '1', description: 'Category id' })
  readonly category_id?: number

  @ApiProperty({ example: '1', description: 'MCC id' })
  readonly merchant_code?: number

  @ApiProperty({ example: 190, description: 'Amount of transaction' })
  readonly amount: number

  @ApiProperty({ example: '1', description: 'Currency id' })
  readonly currency_id: number
}
