import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './users.model'

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([User, Board])],
})
export class UsersModule {
}
