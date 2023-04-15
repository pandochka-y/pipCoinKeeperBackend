import { Controller, Get, Post } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import type { BoardService } from './board.service'

@Controller('board')
export class BoardController {
  constructor(readonly boardService: BoardService) {
  }

  @ApiOperation({ summary: 'Create board' })
  @Post()
  createBoard() {
    return this.boardService.createBoard()
  }

  @ApiOperation({ summary: 'Get all boards' })
  @Get()
  getAllBoards() {
    return this.boardService.getAllBoards()
  }
}
