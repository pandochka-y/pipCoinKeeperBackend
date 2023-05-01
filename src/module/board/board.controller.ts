import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { BoardService } from './board.service'
import { Board } from './board.model'
import { CreateBoardDto } from './dto/create-board.dto'
import { GetQueryBoardsDto } from './dto/get-query-boards.dto'

@ApiTags('Boards')
@Controller('boards')
export class BoardController {
  constructor(readonly boardService: BoardService) {
  }

  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({ status: 200, type: Board })
  @Post()
  createBoard(@Body() boardDto: CreateBoardDto) {
    return this.boardService.createBoard(boardDto)
  }

  @ApiOperation({ summary: 'Get board by id' })
  @ApiResponse({ status: 200, type: Board })
  @Get('/:id')
  getBoardById(@Param() { id }: { id: number }) {
    return this.boardService.getBoardById(id)
  }

  @ApiOperation({ summary: 'Get all boards' })
  @ApiResponse({ status: 200, type: [Board] })
  @Get()
  getAllBoardsByUser(@Query() query: GetQueryBoardsDto) {
    return this.boardService.getAllBoardsByUser(query)
  }
}
