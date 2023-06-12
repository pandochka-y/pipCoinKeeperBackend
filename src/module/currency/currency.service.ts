import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'

import { Currency } from './currency.model'
import { CreateCurrencyDto } from './dto/create-currency.dto'

@Injectable()
export class CurrencyService {
  constructor(@InjectModel(Currency) private currencyRepository: typeof Currency) {
  }

  async getAllCurrency() {
    return await this.currencyRepository.findAll()
  }

  async getCurrencyByCodeOrSymbol(codeOrSymbol: string) {
    return await this.currencyRepository.findOne({ where: { [Op.or]: [{ code: codeOrSymbol }, { currency_symbol: codeOrSymbol }] } })
  }

  async createCurrency(code: CreateCurrencyDto) {
    return await this.currencyRepository.create(code)
  }
}
