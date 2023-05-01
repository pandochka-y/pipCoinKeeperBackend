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
import { BoardUser } from '../board-users/board-users.model'

interface IUserCreationAttributesWeb {
  email: string
  password: string
}

interface IUserCreationAttributesTelegram {
  telegram_id: number
}

type IUserCreationAttributes = IUserCreationAttributesWeb | IUserCreationAttributesTelegram

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttributes> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: 'Stepan', description: 'user name' })
  @Column({ type: DataType.STRING, defaultValue: 'User' })
  name: string

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
  @Column({ type: DataType.INTEGER })
  telegram_id: number

  @HasMany(() => Board)
  boards: Board[]

  @HasMany(() => BoardUser)
  member_boards: BoardUser[]

  @CreatedAt
  registered_at: Date

  @UpdatedAt
  updated_at: Date
}
