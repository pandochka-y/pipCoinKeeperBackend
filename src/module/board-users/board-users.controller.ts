import { Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { BoardUsersService } from './board-users.service'
import { BoardUser } from './board-users.model'
import { CreateBoardUserDto } from './dto/create-board-user.dto'

@Controller('board-users')
export class BoardUsersController {
  constructor(private readonly boardUsersService: BoardUsersService) {}

  @ApiOperation({ summary: 'Get all board-users by board id' })
  @ApiResponse({ status: 200, type: [BoardUser] })
  @Get('/:board')
  getAllBoardUsers(@Param('board') id: number) {
    return this.boardUsersService.getAllBoardUsers(id)
  }

  @ApiOperation({ summary: 'Get member by id' })
  @ApiResponse({ status: 200, type: BoardUser })
  @Get('/member/:id')
  getBoardUsersById(@Param('id') id: number) {
    return this.boardUsersService.getBoardUserById(id)
  }

  @ApiOperation({ summary: 'Create member' })
  @ApiResponse({ status: 200, type: BoardUser })
  @Post()
  createBoardUser(dto: CreateBoardUserDto) {
    return this.boardUsersService.createBoardUser(dto)
  }

  @ApiOperation({ summary: 'Delete member' })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
  deleteBoardUser(@Param('id') id: number) {
    return this.boardUsersService.deleteBoardUser(id)
  }

  // @ApiOperation({ summary: 'Get member by user id' })
  // @ApiResponse({ status: 200, type: Member })
  // @Get('/user/:id')
  // getMemberByUserId(@Param('id') id: number) {
  //   return this.boardUsersService.getMemberByUserId(id)
  // }
}
