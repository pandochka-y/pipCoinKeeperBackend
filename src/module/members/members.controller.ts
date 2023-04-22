import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { MembersService } from './members.service'
import { Member } from './members.model'

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({ summary: 'Get all members by board id' })
  @ApiResponse({ status: 200, type: [Member] })
  @Get('/board/:board')
  getAllMembersBoard(@Param('board') id: number) {
    return this.membersService.getAllMembersBoard(id)
  }

  @ApiOperation({ summary: 'Get member by id' })
  @ApiResponse({ status: 200, type: Member })
  @Get('/member/:id')
  getMemberById(@Param('id') id: number) {
    return this.membersService.getMemberById(id)
  }

  @ApiOperation({ summary: 'Get member by user id' })
  @ApiResponse({ status: 200, type: Member })
  @Get('/user/:id')
  getMemberByUserId(@Param('id') id: number) {
    return this.membersService.getMemberByUserId(id)
  }
}
