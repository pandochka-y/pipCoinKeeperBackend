import { ApiProperty } from '@nestjs/swagger'

export class CreateBoardUserDto {
  @ApiProperty({ example: '1', description: 'Board id' })
  readonly board_id: number

  @ApiProperty({ example: '1', description: 'User id' })
  readonly user_id: number

  @ApiProperty({ example: '1', description: 'Role id' })
  readonly role_id: number
}
