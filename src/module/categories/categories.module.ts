import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'
import { User } from '../users/users.model'
import { MerchantCode } from '../merchant-code/merchant-code.model'
import { Operation } from '../operations/operations.model'

import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { Category } from './categories.model'
import { CategoryMC } from './categories-mc.model'
import { CategoryLimit } from './categories-limit.model'

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Category, Board, User, MerchantCode, CategoryMC, Operation, CategoryLimit]),
  ],
})

export class CategoriesModule {
}
