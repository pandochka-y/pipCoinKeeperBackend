import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'

import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { Category } from './categories.model'

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
  imports: [
    SequelizeModule.forFeature([Category, Board]),
  ],
})
export class CategoriesModule {
}
