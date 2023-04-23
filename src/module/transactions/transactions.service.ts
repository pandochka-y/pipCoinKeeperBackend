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
    return this.transactionRepository.create(transaction)
  }

  async getTransactions(boardId: number, query: GetTransactionDto): Promise<Transaction[]> {
    return this.transactionRepository.findAll({ where: { board_id: boardId } })
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.findAll({ where: { user_id: userId } })
  }
}
