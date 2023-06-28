import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

import { Category } from './categories.model'

@Table({ tableName: 'category_limit', updatedAt: false, createdAt: false })

export class CategoryLimit extends Model<CategoryLimit> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  category_id: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  board_id: number

  @BelongsTo(() => Category, { foreignKey: 'category_id' })
  category: Category

  @Column({ type: DataType.INTEGER })
  amount_limit: number
}
