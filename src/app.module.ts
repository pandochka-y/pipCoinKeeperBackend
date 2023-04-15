import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UsersModule } from './users/users.module'
import { User } from './users/users.model'
import { BoardController } from './board/board.controller'
import { BoardService } from './board/board.service'
import { BoardModule } from './board/board.module'
import { Board } from './board/board.model'
import { CurrencyModule } from './currency/currency.module'
import { Currency } from './currency/currency.model'

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
      models: [User, Board, Currency],
    }),
    UsersModule,
    BoardModule,
    CurrencyModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class AppModule {
  constructor() {
  }
}
