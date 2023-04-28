import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { TransactionsService } from './transactions.service'
import { GetTransactionDto } from './dto/get-transaction.dto'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Transaction } from './transactions.model'

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

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, type: [Transaction] })
  @Get(':board_id')
  getBoardTransactions(@Param('board_id') board_id: number, @Query() query: GetTransactionDto) {
    return this.transactionsService.getAllBoardTransactions(board_id, query)
  }

  @ApiOperation({ summary: 'Create transaction' })
  @ApiResponse({ status: 200, type: Transaction })
  @Post()
  createTransaction(@Body() dto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(dto)
  }
}
