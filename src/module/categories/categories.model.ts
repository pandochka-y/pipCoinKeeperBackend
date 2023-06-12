import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType, ForeignKey, HasMany, HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Board } from '../board/board.model'
import { User } from '../users/users.model'
import { MerchantCode } from '../merchant-code/merchant-code.model'
import { Operation } from '../operations/operations.model'

import { CategoryMC } from './categories-mc.model'
import { CategoryLimit } from './categories-limit.model'

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

  @ApiProperty({ example: '123', description: 'Board id' })
  @ForeignKey(() => Board)
  @Column({ type: DataType.INTEGER })
  board_id: number
  // TODO: add amount limit to category

  @BelongsTo(() => Board)
  board: Board

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: true })
  user_id: number

  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => CategoryLimit)
  @Column({ type: DataType.INTEGER, allowNull: true })
  category_limit_id: number

  @HasOne(() => CategoryLimit)
  limit: CategoryLimit

  @BelongsToMany(() => MerchantCode, () => CategoryMC)
  merchant_codes: MerchantCode[]

  @HasMany(() => Operation)
  transactions: Operation[]

  @CreatedAt
  created_at: Date

  @UpdatedAt
  updated_at: Date
}
