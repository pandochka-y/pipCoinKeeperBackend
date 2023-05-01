import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'
import { User } from '../users/users.model'
import { Role } from '../roles/roles.model'

import { BoardUsersController } from './board-users.controller'
import { BoardUsersService } from './board-users.service'
import { BoardUser } from './board-users.model'

@Module({
  providers: [BoardUsersService],
  controllers: [BoardUsersController],
  imports: [
    SequelizeModule.forFeature([BoardUser, User, Board, Role]),
  ],
  exports: [BoardUsersService],
})
export class BoardUsersModule {}
