import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Board } from './board.model'
import { CreateBoardDto } from './dto/create-board.dto'

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board) {
  }

  async createBoard(boardDto: CreateBoardDto) {
    return await this.boardRepository.create(boardDto)
  }

  async getBoardById(id: number) {
    return await this.boardRepository.findOne({ where: { id }, include: { all: true } })
  }

  async getBoardAll() {
    return await this.boardRepository.findAll()
  }
}
