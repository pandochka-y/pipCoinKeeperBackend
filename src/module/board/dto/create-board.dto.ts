import { ApiProperty } from '@nestjs/swagger'

export class CreateBoardDto {
  @ApiProperty({ example: '99292', description: 'User id that will be owner of the board' })
  readonly user_id: string

  @ApiProperty({ example: '123', description: 'Currency id' })
  readonly currency_id: string
}
