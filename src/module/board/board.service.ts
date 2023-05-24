import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { BoardUsersService } from '../board-users/board-users.service'

import { Board } from './board.model'
import { CreateBoardDto } from './dto/create-board.dto'
import { GetQueryBoardsDto } from './dto/get-query-boards.dto'

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board, private boardUsersService: BoardUsersService) {
  }

  async createBoard(boardDto: CreateBoardDto) {
    const boards = await this.boardRepository.findAll({ where: { id: boardDto.user_id } })
    if (boards.length && !boardDto.name)
      boardDto.name = `${boardDto.name} ${boards.length}`
    return await this.boardRepository.create(boardDto)
  }

  async getBoardById(id: number) {
    return await this.boardRepository.findOne({ where: { id }, include: { all: true } })
  }

  async getAllBoardsByUser(query: GetQueryBoardsDto) {
    const boards = await this.boardUsersService.getAllBoardsByUserId(query.user_id)
    if (!boards.length)
      return []

    return await this.boardRepository.findAll({
      where: {
        id: {
          [Op.or]: boards.map(board => board.board_id),
        },
      },
    })
  }
}
