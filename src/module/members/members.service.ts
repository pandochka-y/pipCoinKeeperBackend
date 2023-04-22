import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Member } from './members.model'

@Injectable()
export class MembersService {
  constructor(@InjectModel(Member) private readonly memberRepository: typeof Member) {}

  async getAllMembersBoard(id: number) {
    return await this.memberRepository.findAll(
      { where: { board_id: id } },
    )
  }

  async getMemberById(id: number) {
    return await this.memberRepository.findOne({ where: { id } })
  }

  async getMemberByUserId(id: number) {
    return await this.memberRepository.findOne({ where: { user_id: id } })
  }
}
