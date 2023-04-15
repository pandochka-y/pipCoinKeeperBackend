import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

import { Currency } from './currency.model'

import type { CurrencyService } from './currency.service'

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {
  }

  @ApiResponse({ type: [Currency] })
  @Get('/currency')
  getAllCurrencies() {
    return this.currencyService.getAllCurrencies()
  }

  @ApiResponse({ type: Currency })
  @Get('/currency/:code')
  getCurrencyByCode(@Param('code') code: string) {
    return this.currencyService.getCurrencyByCode(code)
  }

  @ApiResponse({ type: Currency })
  @Post('/currency')
  createCurrency(code: string) {
    return this.currencyService.createCurrency(code)
  }
}
