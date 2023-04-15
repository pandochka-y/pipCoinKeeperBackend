import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Board } from './board.model'

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board) private boardRepository: typeof Board) {
  }

  createBoard() {
    return 'This action adds a new board'
  }

  getAllBoards() {
    return 'This action returns all board'
  }
}
