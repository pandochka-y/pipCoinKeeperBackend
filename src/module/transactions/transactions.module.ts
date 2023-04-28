import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'
import { User } from '../users/users.model'
import { Category } from '../categories/categories.model'
import { Currency } from '../currency/currency.model'

import { TransactionsService } from './transactions.service'
import { TransactionsController } from './transactions.controller'
import { Transaction } from './transactions.model'

@Module({
  providers: [TransactionsService],
  controllers: [TransactionsController],
  imports: [
    SequelizeModule.forFeature([Transaction, User, Board, Category, Currency]),
  ],
})
export class TransactionsModule {}
