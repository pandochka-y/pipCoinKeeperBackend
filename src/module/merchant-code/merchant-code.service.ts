import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { MerchantCode } from './merchant-code.model'
import { CreateMerchantCodeDto } from './dto/create-merchant-code.dto'

@Injectable()
export class MerchantCategoryService {
  constructor(
    @InjectModel(MerchantCode)
    private readonly merchantCodeRepository: typeof MerchantCode,
  ) {
  }

  async getAllMerchantCode() {
    return await this.merchantCodeRepository.findAll()
  }

  async getMerchantCodeByCode(code: number) {
    return await this.merchantCodeRepository.findOne({ where: { code } })
  }

  async createMerchantCode(mcc: CreateMerchantCodeDto) {
    return await this.merchantCodeRepository.create(mcc)
  }
}
