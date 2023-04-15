import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface ICurrencyCreationAttributes {
  code: string
}

@Table({ tableName: 'currency' })

export class Currency extends Model<Currency, ICurrencyCreationAttributes> {
  @ApiProperty({ example: '123', description: 'currency id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: 'RUB', description: 'currency code' })
  @Column({ type: DataType.STRING, allowNull: false })
  code: string

  @CreatedAt
  registered_at: Date

  @UpdatedAt
  updated_at: Date
}
