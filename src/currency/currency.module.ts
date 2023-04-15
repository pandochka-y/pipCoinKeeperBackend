import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { CurrencyService } from './currency.service'
import { CurrencyController } from './currency.controller'
import { Currency } from './currency.model'

@Module({
  providers: [CurrencyService],
  controllers: [CurrencyController],
  imports: [
    SequelizeModule.forFeature([Currency]),
  ],
})
export class CurrencyModule {
}
