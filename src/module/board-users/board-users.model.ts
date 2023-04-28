import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../users/users.model'
import { Board } from '../board/board.model'
import { Role } from '../roles/roles.model'

interface IBoardCreationAttributes {
  user_id: number
  board_id: number
  role_id: number
}

@Table({ tableName: 'board_users' })

export class BoardUser extends Model<BoardUser, IBoardCreationAttributes> {
  @ApiProperty({ example: '123', description: 'member id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: '123', description: 'Board id' })
  @ForeignKey(() => Board)
  @Column({ type: DataType.INTEGER, allowNull: false })
  board_id: number

  @BelongsTo(() => Board)
  board: Board

  @ApiProperty({ example: '123', description: 'User id' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => Role)
  @ApiProperty({ example: 'admin', description: 'role' })
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  role_id: number

  @BelongsTo(() => Role)
  role: Role

  @CreatedAt
  added_at: Date

  @UpdatedAt
  updated_at: Date
}
