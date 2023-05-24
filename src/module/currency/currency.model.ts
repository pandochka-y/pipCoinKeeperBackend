import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface ICurrencyCreationAttributes {
  code: string
}

@Table({ tableName: 'currency', updatedAt: false, createdAt: false })

export class Currency extends Model<Currency, ICurrencyCreationAttributes> {
  @ApiProperty({ example: '123', description: 'currency id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: 'RUB', description: 'currency code' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  code: string

  // @CreatedAt
  // registered_at: Date
  //
  // @UpdatedAt
  // updated_at: Date
}
