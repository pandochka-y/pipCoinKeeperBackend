import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  @ApiProperty({ example: 'Category name', description: 'Category name' })
  name: string

  @IsNotEmpty({ message: 'Board id cannot be empty' })
  @ApiProperty({ example: '1', description: 'Board id' })
  board_id: number
}
