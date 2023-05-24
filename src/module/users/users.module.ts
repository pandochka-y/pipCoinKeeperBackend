import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'
import { BoardUsersModule } from '../board-users/board-users.module'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './users.model'

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Board]),
    BoardUsersModule,
  ],
  exports: [UsersService],
})
export class UsersModule {
}
