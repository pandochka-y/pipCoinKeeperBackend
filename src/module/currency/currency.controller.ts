import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Currency } from './currency.model'
import { CurrencyService } from './currency.service'
import { CreateCurrencyDto } from './dto/create-currency.dto'

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {
  }

  @ApiOperation({ summary: 'Get all currencies' })
  @ApiResponse({ type: [Currency] })
  @Get()
  getCurrencyAll() {
    return this.currencyService.getAllCurrency()
  }

  @ApiOperation({ summary: 'Get currency by code' })
  @ApiResponse({ type: Currency })
  @Get('/:code')
  getCurrencyByCode(@Param('code') code: string) {
    return this.currencyService.getCurrencyByCodeOrSymbol(code)
  }

  @ApiOperation({ summary: 'Create currency' })
  @ApiResponse({ type: Currency })
  @Post()
  createCurrency(@Body() code: CreateCurrencyDto) {
    console.log('currency', code)
    return this.currencyService.createCurrency(code)
  }
}
