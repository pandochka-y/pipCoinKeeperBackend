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
import { MembersModule } from './module/members/members.module'
import { TransactionsModule } from './module/transactions/transactions.module'
import { Member } from './module/members/members.model'
import { Transaction } from './module/transactions/transactions.model'

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
      models: [User, Board, Currency, MerchantCode, CategoryMC, Category, Member, Transaction],
    }),
    UsersModule,
    BoardModule,
    CurrencyModule,
    AuthModule,
    CategoriesModule,
    MerchantCodeModule,
    MembersModule,
    TransactionsModule,
  ],
})
export class AppModule {
}
