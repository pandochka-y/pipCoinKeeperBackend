import { Module } from '@nestjs/common'
import { InjectBot, TelegrafModule } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'

import { UsersModule } from '../users/users.module'
import { BoardModule } from '../board/board.module'
import { CurrencyModule } from '../currency/currency.module'
import { BoardUsersModule } from '../board-users/board-users.module'

import { BotService } from './bot.service'
import { botMiddleware, botMiddlewareResponseTime } from './bot.middleware'
import { BotUpdate } from './bot.update'
import { BoardListScene } from './scenes/board-list.scene'
import { CreateBoardScene } from './scenes/create-board.scene'
import { DetailBoardScene } from './scenes/detail-board.scene'
import { BoardManagementScene } from './scenes/board-management.scene'
import { PaymentListScene } from './scenes/payment-list.scene'
import { BoardReportScene } from './scenes/board-report.scene'
import { CreatePaymentScene } from './scenes/create-payment.scene'
import { PaymentManagementScene } from './scenes/payment-management.scene'
import { BotName } from './bot.constants'
import { MyContext } from './bot.interface'

@Module({
  providers: [
    BotService,
    BotUpdate,
    BoardListScene,
    CreateBoardScene,
    DetailBoardScene,
    BoardListScene,
    BoardManagementScene,
    PaymentListScene,
    BoardReportScene,
    CreatePaymentScene,
    PaymentManagementScene,
  ],

  imports: [
    TelegrafModule.forRootAsync({
      botName: 'bot',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [botMiddleware, botMiddlewareResponseTime],
        launchOptions: {

        },
      }),
    }),
    UsersModule,
    BoardModule,
    CurrencyModule,
    BoardUsersModule,
  ],
})
export class BotModule {
  constructor(
    @InjectBot(BotName) private bot: Telegraf<MyContext>,
  ) {
    this.bot.catch(console.error)
  }
}
