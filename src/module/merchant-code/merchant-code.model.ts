import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Category } from '../categories/categories.model'
import { CategoryMC } from '../categories/categories-mc.model'

interface IMerchantCategoryCreationAttributes {
  code: number
}

@Table({ tableName: 'merchant-code', updatedAt: false, createdAt: false })

export class MerchantCode extends Model<MerchantCode, IMerchantCategoryCreationAttributes> {
  @ApiProperty({ example: '123', description: 'merchant-code id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: '4231', description: 'merchant category code' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  code: number

  @BelongsToMany(() => Category, () => CategoryMC)
  categories: Category[]

  // @CreatedAt
  // registered_at: Date
  //
  // @UpdatedAt
  // updated_at: Date
}
