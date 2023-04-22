import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { CategoryMC } from '../categories/categories-mc.model'

import { MerchantCategoryService } from './merchant-code.service'
import { MerchantCodeController } from './merchant-code.controller'
import { MerchantCode } from './merchant-code.model'

@Module({
  providers: [MerchantCategoryService],
  controllers: [MerchantCodeController],
  imports: [
    SequelizeModule.forFeature([MerchantCode, CategoryMC]),
  ],
})
export class MerchantCodeModule {}
