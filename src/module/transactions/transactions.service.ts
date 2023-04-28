import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Transaction } from './transactions.model'
import { GetTransactionDto } from './dto/get-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction) private transactionRepository: typeof Transaction) {
  }

  async createTransaction(transaction: CreateTransactionDto): Promise<Transaction> {
    return await this.transactionRepository.create(transaction)
  }

  async getAllBoardTransactions(board_id: number, query: GetTransactionDto): Promise<Transaction[]> {
    const where = Object.keys(query).reduce((acc, key) => {
      if (query[key] && GetTransactionDto[key])
        acc[key] = query[key]

      return acc
    }, {
      board_id,
    })
    return await this.transactionRepository.findAll({ where: { ...where } })
  }
}
