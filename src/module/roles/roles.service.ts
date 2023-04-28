import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Role } from './roles.model'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {
  }

  async createRole(role: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.create(role)
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepository.destroy({ where: { id } })
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.findAll()
  }
}
