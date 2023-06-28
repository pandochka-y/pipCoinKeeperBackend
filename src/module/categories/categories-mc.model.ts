import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

import { MerchantCode } from '../merchant-code/merchant-code.model'

import { Category } from './categories.model'

@Table({ tableName: 'category_mc', updatedAt: false, createdAt: false })

export class CategoryMC extends Model<CategoryMC> {
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  category_id: number

  @BelongsTo(() => Category)
  category: Category

  @ForeignKey(() => MerchantCode)
  @Column({ type: DataType.INTEGER })
  merchant_code_id: number

  @BelongsTo(() => MerchantCode, { foreignKey: 'merchant_code_id' })
  merchant_code: MerchantCode
}
