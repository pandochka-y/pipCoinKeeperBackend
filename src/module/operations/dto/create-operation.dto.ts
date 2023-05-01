import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateOperationDto {
  @IsNotEmpty({ message: 'Board user id cannot be empty' })
  @ApiProperty({ example: '123', description: 'User id' })
  readonly board_user_id: number

  @IsNotEmpty({ message: 'Board id cannot be empty' })
  @ApiProperty({ example: '1', description: 'Board id' })
  readonly board_id: number

  @IsOptional()
  @ApiProperty({ example: '1', description: 'Category id' })
  readonly category_id?: number

  @IsOptional()
  @ApiProperty({ example: '1', description: 'MCC id' })
  readonly merchant_code?: number

  @IsNotEmpty({ message: 'Amount cannot be empty' })
  @ApiProperty({ example: 190, description: 'Amount of transaction' })
  readonly amount: number

  @IsNotEmpty({ message: 'Currency id cannot be empty' })
  @ApiProperty({ example: '1', description: 'Currency id' })
  readonly currency_id: number
}
