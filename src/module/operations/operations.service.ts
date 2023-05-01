import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { getPeriodDate } from '../../utils/date'
import { BoardUser } from '../board-users/board-users.model'

import { CreateOperationDto } from './dto/create-operation.dto'
import { Operation } from './operations.model'
import { GetOperationsDto } from './dto/get-operations.dto'

@Injectable()
export class OperationsService {
  constructor(@InjectModel(Operation) private transactionRepository: typeof Operation) {
  }

  async createOperation(transaction: CreateOperationDto): Promise<Operation> {
    return await this.transactionRepository.create(transaction)
  }

  async getBoardOperations(query: GetOperationsDto): Promise<Operation[]> {
    const { to, from, ...paramsQuery } = query

    const periodDate = getPeriodDate(to, from)

    return await this.transactionRepository.findAll({
      where: {
        ...paramsQuery,
        created_at: {
          [Op.gte]: periodDate.from,
          [Op.lte]: periodDate.to,
        },
      },
      include: [{ model: BoardUser }],
    })
  }
}
