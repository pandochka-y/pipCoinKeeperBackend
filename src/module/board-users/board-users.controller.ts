import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { BoardUsersService } from './board-users.service'
import { BoardUser } from './board-users.model'
import { CreateBoardUserDto } from './dto/create-board-user.dto'
import { GetBoardUsersDto } from './dto/get-board-users.dto'

@ApiTags('Board-users')
@Controller('board-users')
export class BoardUsersController {
  constructor(private readonly boardUsersService: BoardUsersService) {}

  @ApiOperation({ summary: 'Get board-users by board id' })
  @ApiResponse({ status: 200, type: [BoardUser] })
  @Get()
  getAllBoardUsers(@Query() query: GetBoardUsersDto) {
    return this.boardUsersService.getBoardUsers(query)
  }

  @ApiOperation({ summary: 'Create member' })
  @ApiResponse({ status: 200, type: BoardUser })
  @Post()
  createBoardUser(@Body() dto: CreateBoardUserDto) {
    console.log(dto)
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
