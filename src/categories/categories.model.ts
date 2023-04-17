import { BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Board } from '../board/board.model'

interface ICategoryCreationAttributes {
  name: string
  board_id: number
}

@Table({ tableName: 'category' })

export class Category extends Model<Category, ICategoryCreationAttributes> {
  @ApiProperty({ example: '123', description: 'currency id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: 'Транспорт', description: 'category name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string

  @BelongsTo(() => Board)
  @Column({ type: DataType.INTEGER })
  board_id: number

  @CreatedAt
  registered_at: Date

  @UpdatedAt
  updated_at: Date
}
