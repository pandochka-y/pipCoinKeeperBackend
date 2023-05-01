import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class GetOperationsDto {
  @IsNotEmpty({ message: 'Board id cannot be empty' })
  @ApiProperty({ example: '123', description: 'board id' })
  readonly board_id: number

  @IsOptional()
  @ApiProperty({ example: '123', description: 'User id', required: false })
  readonly board_user_id?: number

  @IsOptional()
  @ApiProperty({ example: '1', description: 'Category id', required: false })
  readonly category_id?: number

  @IsOptional()
  @ApiProperty({ example: '1', description: 'MCC id', required: false })
  readonly merchant_code?: number

  @IsOptional()
  @ApiProperty({ example: '2020-01-01', description: 'Date from', required: false })
  readonly from?: string

  @IsOptional()
  @ApiProperty({ example: '2020-01-02', description: 'Date to', required: false })
  readonly to?: string
}
