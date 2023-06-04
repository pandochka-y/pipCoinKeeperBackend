import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'

import { UsersModule } from '../users/users.module'
import { BoardModule } from '../board/board.module'
import { CurrencyModule } from '../currency/currency.module'
import { BoardUsersModule } from '../board-users/board-users.module'

import { BotService } from './bot.service'
import { botMiddleware } from './bot.middleware'
import { BotUpdate } from './bot.update'
import { BoardListScene } from './scenes/board-list.scene'
import { CreateBoardScene } from './scenes/create-board.scene'
import { DetailBoardScene } from './scenes/detail-board.scene'

@Module({
  providers: [
    BotService,
    BotUpdate,
    BoardListScene,
    CreateBoardScene,
    DetailBoardScene,
  ],
  imports: [
    TelegrafModule.forRootAsync({
      botName: 'bot',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [botMiddleware],
      }),
    }),
    UsersModule,
    BoardModule,
    CurrencyModule,
    BoardUsersModule,
  ],
})
export class BotModule {
}
