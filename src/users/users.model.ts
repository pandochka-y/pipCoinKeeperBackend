import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table, UpdatedAt,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Board } from '../board/board.model'

interface IUserCreationAttributesWeb {
  email?: string
  password?: string
}

interface IUserCreationAttributesTelegram {
  telegram_id: number
}

type IUserCreationAttributes = IUserCreationAttributesWeb | IUserCreationAttributesTelegram

@Table({ tableName: 'users' })

export class User extends Model<User, IUserCreationAttributes> {
  @ApiProperty({ example: '123', description: 'user id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: 'example@example.com', description: 'Unique email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  email: string

  @ApiProperty({ example: 'password', description: 'password' })
  @Column({ type: DataType.STRING, allowNull: true })
  password: string

  @ApiProperty({ example: 'user', description: 'not allowed', readOnly: true, default: 'user' })
  @Column({ type: DataType.STRING, defaultValue: 'user' })
  role: string

  @ApiProperty({ example: '21939129312', description: 'telegram id from bot' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  telegram_id: number

  @CreatedAt
  registered_at: Date

  @UpdatedAt
  updated_at: Date

  // @ForeignKey(() => Board)
  // @Column({ type: DataType.INTEGER })
  // main_board_id: number;

  @HasMany(() => Board)
  boards: Board[]
  // @BelongsToMany(() => Board, () => UserBoards)
  // boards: Board[];
}
