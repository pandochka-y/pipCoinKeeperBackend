import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'
import { User } from '../users/users.model'
import { Category } from '../categories/categories.model'
import { Currency } from '../currency/currency.model'

import { OperationsService } from './operations.service'
import { OperationsController } from './operations.controller'
import { Operation } from './operations.model'

@Module({
  providers: [OperationsService],
  controllers: [OperationsController],
  imports: [
    SequelizeModule.forFeature([Operation, User, Board, Category, Currency]),
  ],
})
export class OperationsModule {}
