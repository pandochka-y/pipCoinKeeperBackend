import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Board } from '../board/board.model'

import { User } from './users.model'
import { CreateUserTelegramDto, CreateUserWebDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserWebDto | CreateUserTelegramDto) {
    return await this.userRepository.create(dto)
  }

  async getAllUsers() {
    return await this.userRepository.findAll()
  }

  async getUserByTelegramId(id: number) {
    return await this.userRepository.findOne({ where: { telegram_id: id }, include: { model: Board } })
  }

  async setActiveBoard(user_id: number, board_id: number) {
    const user = await this.userRepository.findOne({ where: { id: user_id } })
    return user.update({ active_board_id: board_id }, { where: { id: user_id } })
  }

  async updateUserById(id: number, dto: CreateUserTelegramDto) {
    return await this.userRepository.update(dto, { where: { id } })
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async welcomeTelegramUser(dto: CreateUserTelegramDto) {
    const user = await this.getUserByTelegramId(dto.telegram_id)
    if (user)
      return await user.update(dto)

    return await this.createUser(dto)
  }
}
