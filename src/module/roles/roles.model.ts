import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface IUserCreationAttributesWeb {
  email: string
  password: string
}

interface IUserCreationAttributesTelegram {
  telegram_id: number
}

type IUserCreationAttributes = IUserCreationAttributesWeb | IUserCreationAttributesTelegram

@Table({ tableName: 'roles', updatedAt: false, createdAt: false })

export class Role extends Model<Role, IUserCreationAttributes> {
  @ApiProperty({ example: '123', description: 'role id', readOnly: true })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  id: number

  @ApiProperty({ example: 'ADMIN', description: 'role name' })
  @Column({ type: DataType.STRING, defaultValue: 'USER' })
  role: string

  // @CreatedAt
  // createt_at: Date
  //
  // @UpdatedAt
  // updated_at: Date
}
