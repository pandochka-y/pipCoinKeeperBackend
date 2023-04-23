import { ApiProperty } from '@nestjs/swagger'

export class GetTransactionDto {
  @ApiProperty({ example: '123', description: 'User id' })
  readonly user_id: number

  @ApiProperty({ example: '1', description: 'Category id' })
  readonly category_id?: number

  @ApiProperty({ example: '1', description: 'MCC id' })
  readonly merchant_code?: number

  @ApiProperty({ example: '2020-01-01', description: 'Date from' })
  readonly from: Date

  @ApiProperty({ example: '2020-01-02', description: 'Date to' })
  readonly to: Date
}
