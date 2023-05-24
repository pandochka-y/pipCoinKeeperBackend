import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UsersModule } from './module/users/users.module'
import { User } from './module/users/users.model'
import { BoardModule } from './module/board/board.module'
import { Board } from './module/board/board.model'
import { CurrencyModule } from './module/currency/currency.module'
import { Currency } from './module/currency/currency.model'
import { AuthModule } from './module/auth/auth.module'
import { CategoriesModule } from './module/categories/categories.module'
import { MerchantCodeModule } from './module/merchant-code/merchant-code.module'
import { MerchantCode } from './module/merchant-code/merchant-code.model'
import { CategoryMC } from './module/categories/categories-mc.model'
import { Category } from './module/categories/categories.model'
import { BoardUsersModule } from './module/board-users/board-users.module'
import { OperationsModule } from './module/operations/operations.module'
import { BoardUser } from './module/board-users/board-users.model'
import { Operation } from './module/operations/operations.model'
import { RolesModule } from './module/roles/roles.module'
import { Role } from './module/roles/roles.model'
import { BotModule } from './module/bot/bot.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      models: [User, Board, Currency, MerchantCode, CategoryMC, Category, BoardUser, Operation, Role],
    }),
    UsersModule,
    BoardModule,
    CurrencyModule,
    AuthModule,
    CategoriesModule,
    MerchantCodeModule,
    BoardUsersModule,
    OperationsModule,
    RolesModule,
    BotModule,
  ],
})
export class AppModule {
}
