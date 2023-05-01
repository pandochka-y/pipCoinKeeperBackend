import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class GetBoardUsersDto {
  @IsNotEmpty({ message: 'Board id cannot be empty' })
  @ApiProperty({ example: '1', description: 'Board id' })
  readonly board_id: number

  @IsOptional()
  @ApiProperty({ example: '1', description: 'User id', required: false })
  readonly user_id?: number

  @IsOptional()
  @ApiProperty({ example: '1', description: 'Role id', required: false })
  readonly role_id?: number
}
