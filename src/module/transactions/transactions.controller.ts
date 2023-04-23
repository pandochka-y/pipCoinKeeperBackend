import { Controller, Get, Param, Query } from '@nestjs/common'

import { TransactionsService } from './transactions.service'
import { GetTransactionDto } from './dto/get-transaction.dto'

interface IQueryParams {
  user_id?: number
  category_id?: number
  merchant_code?: number
  from?: string
  to?: string
}

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {
  }

  @Get(':boardId')
  async getTransactions(@Param('boardId') boardId: number, @Query() query: GetTransactionDto) {
    return await this.transactionsService.getTransactions(boardId, query)
  }
}
