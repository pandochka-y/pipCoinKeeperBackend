import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../users/users.model'
import { Board } from '../board/board.model'

interface IBoardCreationAttributes {
  user_id: string
}

@Table({ tableName: 'members' })

export class Member extends Model<Member, IBoardCreationAttributes> {
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

  @ApiProperty({ example: 'admin', description: 'role' })
  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'member' })
  role: string

  @CreatedAt
  added_at: Date

  @UpdatedAt
  updated_at: Date
}
