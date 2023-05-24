import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { Optional } from '@nestjs/common'

export class CreateBoardDto {
  @IsNotEmpty({ message: 'Board name cannot be empty' })
  @ApiProperty({ example: '1', description: 'User id that will be owner of the board' })
  user_id: number

  @IsOptional()
  @ApiProperty({ example: '19999', description: 'amount' })
  amount_limit?: number

  @IsNotEmpty({ message: 'Currency id cannot be empty' })
  @ApiProperty({ example: '1', description: 'Currency id' })
  currency_id: number

  @Optional()
  @ApiProperty({ example: 'Board name', description: 'Board name' })
  name: string
}
