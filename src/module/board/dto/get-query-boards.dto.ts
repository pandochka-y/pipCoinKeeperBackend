import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class GetQueryBoardsDto {
  @IsNotEmpty({ message: 'Board id cannot be empty' })
  @ApiProperty({ example: 1, description: 'user id' })
  readonly user_id: number
}
