import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger'

import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './roles.model'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @ApiResponse({ status: 200, type: Role })
  @ApiProperty({ type: CreateRoleDto })
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto)
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles()
  }

  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
  deleteRole(@Param('id') id: number) {
    return this.rolesService.deleteRole(id)
  }
}
