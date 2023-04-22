import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

import { MerchantCode } from '../merchant-code/merchant-code.model'

import { Category } from './categories.model'

@Table({ tableName: 'category_mc', updatedAt: false, createdAt: false })

export class CategoryMC extends Model<CategoryMC> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  category_id: number

  @ForeignKey(() => MerchantCode)
  @Column({ type: DataType.INTEGER })
  mcc_id: number
}
