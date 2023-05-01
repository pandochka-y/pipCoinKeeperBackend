import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateBoardDto {
  @IsNotEmpty({ message: 'Board name cannot be empty' })
  @ApiProperty({ example: '1', description: 'User id that will be owner of the board' })
  readonly user_id: number

  @IsOptional()
  @ApiProperty({ example: '19999', description: 'amount' })
  readonly amount_limit?: number

  @IsNotEmpty({ message: 'Currency id cannot be empty' })
  @ApiProperty({ example: '1', description: 'Currency id' })
  readonly currency_id: number
}
