import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../users/users.model'
import { Currency } from '../currency/currency.model'
import { Member } from '../members/members.model'

interface IBoardCreationAttributes {
  user_id: string
  amount_limit?: string
  currency_id: string
}

@Table({ tableName: 'boards' })

export class Board extends Model<Board, IBoardCreationAttributes> {
  @ApiProperty({ example: '123', description: 'board id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: '19999', description: 'amount' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  amount_limit: number

  @ApiProperty({ example: '21', description: 'current currency', readOnly: true })
  @ForeignKey(() => Currency)
  @Column({ type: DataType.INTEGER })
  currency_id: number

  @BelongsTo(() => Currency)
  currency: Currency

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number

  @BelongsTo(() => User)
  creator: User

  @HasMany(() => Member)
  members: Member[]

  @CreatedAt
  registered_at: Date

  @UpdatedAt
  updated_at: Date
}
