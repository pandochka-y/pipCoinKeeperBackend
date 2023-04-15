import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { User } from './users.model'

import type { CreateUserTelegramDto, CreateUserWebDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  getUsers() {
    return 'Hello World!'
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll()
    return users
  }

  async createUser(dto: CreateUserWebDto | CreateUserTelegramDto) {
    console.log('user', dto)
    const user = await this.userRepository.create(dto)
    console.log(user)
    return user
  }
}
