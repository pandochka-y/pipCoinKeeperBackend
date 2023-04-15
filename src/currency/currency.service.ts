import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Currency } from './currency.model'

@Injectable()
export class CurrencyService {
  constructor(@InjectModel(Currency) private currencyRepository: typeof Currency) {
  }

  async getAllCurrencies() {
    return await this.currencyRepository.findAll()
  }

  async getCurrencyByCode(code: string) {
    return await this.currencyRepository.findOne({ where: { code } })
  }

  async createCurrency(code: string) {
    return await this.currencyRepository.create({ code })
  }
}
