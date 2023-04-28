import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { BoardUser } from './board-users.model'
import { CreateBoardUserDto } from './dto/create-board-user.dto'

@Injectable()
export class BoardUsersService {
  constructor(@InjectModel(BoardUser) private readonly boardUsersRepository: typeof BoardUser) {}

  async getAllBoardUsers(id: number) {
    return await this.boardUsersRepository.findAll(
      { where: { board_id: id } },
    )
  }

  async getBoardUserById(id: number) {
    return await this.boardUsersRepository.findOne({ where: { id } })
  }

  async createBoardUser(dto: CreateBoardUserDto) {
    return await this.boardUsersRepository.create(dto)
  }

  async deleteBoardUser(id: number) {
    return await this.boardUsersRepository.destroy({ where: { id } })
  }
}
