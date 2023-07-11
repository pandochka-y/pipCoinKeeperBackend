import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

// async getAllBoardCategories(board_id: number, limit = 10, offset = 0, orderBy = 'id', order = 'ASC') {
export class GetCategoryListDto {
  @IsNotEmpty({ message: 'Board id cannot be empty' })
  @ApiProperty({ example: '1', description: 'Board id' })
  board_id: number

  @IsOptional()
  @ApiProperty({ example: '10', description: 'Limit' })
  limit = 10

  @IsOptional()
  @ApiProperty({ example: '0', description: 'Offset' })
  offset = 0

  @IsOptional()
  @ApiProperty({ example: 'id', description: 'Order by' })
  orderBy = 'id'

  @IsOptional()
  @ApiProperty({ example: 'ASC', description: 'Order' })
  order = 'ASC'
}
