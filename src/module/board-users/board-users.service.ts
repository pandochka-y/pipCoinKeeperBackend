import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Role } from '../roles/roles.model'

import { BoardUser } from './board-users.model'
import { CreateBoardUserDto } from './dto/create-board-user.dto'
import { GetBoardUsersDto } from './dto/get-board-users.dto'

@Injectable()
export class BoardUsersService {
  constructor(@InjectModel(BoardUser) private readonly boardUsersRepository: typeof BoardUser) {}

  async getBoardUsers(query: GetBoardUsersDto) {
    if (!query.board_id)
      throw new HttpException('Board id must be a number', HttpStatus.BAD_REQUEST)
    return await this.boardUsersRepository.findAll(
      { where: { ...query } },
    )
  }

  async getAllBoardsByUserId(user_id: number) {
    return await this.boardUsersRepository.findAll({ where: { user_id }, attributes: ['board_id'] })
  }

  async getBoardUserByIds(board_id: number, user_id: number) {
    return await this.boardUsersRepository.findOne({ where: { board_id, user_id }, include: [{ model: Role }] })
  }

  async createBoardUser(dto: CreateBoardUserDto) {
    const boardUser = await this.getBoardUserByIds(dto.board_id, dto.user_id)
    if (boardUser)
      throw new HttpException('User already added', HttpStatus.BAD_REQUEST)

    return await this.boardUsersRepository.create(dto)
  }

  async deleteBoardUser(id: number) {
    return await this.boardUsersRepository.destroy({ where: { id } })
  }
}
