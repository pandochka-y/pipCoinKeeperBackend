import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { Currency } from '../currency/currency.model'

import { MerchantCategoryService } from './merchant-code.service'
import { CreateMerchantCodeDto } from './dto/create-merchant-code.dto'

@ApiTags('Merchant Code')
@Controller('merchant-code')
export class MerchantCodeController {
  constructor(private readonly merchantCategoryService: MerchantCategoryService) {
  }

  @ApiOperation({ summary: 'Get all merchant categories' })
  @ApiResponse({ type: [Currency] })
  @Get()
  getMerchantCodeAll() {
    return this.merchantCategoryService.getAllMerchantCode()
  }

  @ApiOperation({ summary: 'Get merchant category by code' })
  @ApiResponse({ type: Currency })
  @Get('/:code')
  getMerchantCodeByCode(@Param('code') code: number) {
    return this.merchantCategoryService.getMerchantCodeByCode(code)
  }

  @ApiOperation({ summary: 'Create merchant category' })
  @ApiResponse({ type: Currency })
  @Post()
  createMerchantCode(@Body() code: CreateMerchantCodeDto) {
    return this.merchantCategoryService.createMerchantCode(code)
  }
}
