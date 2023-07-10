import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UsersModule } from './users/users.module'
import { User } from './users/users.model'
import { BoardModule } from './board/board.module'
import { Board } from './board/board.model'
import { CurrencyModule } from './currency/currency.module'
import { Currency } from './currency/currency.model'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { MerchantCodeModule } from './merchant-code/merchant-code.module'
import { MerchantCode } from './merchant-code/merchant-code.model'
import { CategoryMC } from './categories/categories-mc.model'
import { Category } from './categories/categories.model'
import { BoardUsersModule } from './board-users/board-users.module'
import { OperationsModule } from './operations/operations.module'
import { BoardUser } from './board-users/board-users.model'
import { Operation } from './operations/operations.model'
import { RolesModule } from './roles/roles.module'
import { Role } from './roles/roles.model'
import { BotModule } from './bot/bot.module'
import { CategoryLimit } from './categories/categories-limit.model'

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
      models: [User, Board, Currency, MerchantCode, CategoryMC, Category, BoardUser, Operation, Role, CategoryLimit],
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
