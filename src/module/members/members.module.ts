import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { Board } from '../board/board.model'
import { User } from '../users/users.model'

import { MembersController } from './members.controller'
import { MembersService } from './members.service'
import { Member } from './members.model'

@Module({
  providers: [MembersService],
  controllers: [MembersController],
  imports: [
    SequelizeModule.forFeature([Member, User, Board]),
  ],
})
export class MembersModule {}
