import * as path from 'node:path'

import { Module } from '@nestjs/common'
import { InjectBot, TelegrafModule } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'

import { UsersModule } from '../users/users.module'
import { BoardModule } from '../board/board.module'
import { CurrencyModule } from '../currency/currency.module'
import { BoardUsersModule } from '../board-users/board-users.module'
import { CategoriesModule } from '../categories/categories.module'

import { BotService } from './bot.service'
import { botMiddleware, botMiddlewareI18n, botMiddlewareResponseTime } from './bot.middleware'
import { BotUpdate } from './bot.update'
import { BoardListScene } from './scenes/board-list/index.scene'
import { CreateBoardScene } from './scenes/board-list/create-board.scene'
import { DetailBoardScene } from './scenes/detail-board/index.scene'
import { BoardManagementScene } from './scenes/detail-board/board-management/index.scene'
import { PaymentListScene } from './scenes/detail-board/payments/payment-list.scene'
import { BoardReportScene } from './scenes/detail-board/board-report/index.scene'
import { CreatePaymentScene } from './scenes/detail-board/payments/create-payment.scene'
import { PaymentManagementScene } from './scenes/detail-board/payments/index.scene'
import { BotName } from './bot.constants'
import { MyContext } from './bot.interface'
import { BoardUsersScene } from './scenes/detail-board/board-management/board-users.scene'
import { RemoveBoardUserScene } from './scenes/detail-board/board-management/remove-board-user.scene'
import { CategoryManagementScene } from './scenes/detail-board/board-management/category-management/index.scene'
import { CreateCategoryScene } from './scenes/detail-board/board-management/category-management/create-category.scene'
import { CategoryListScene } from './scenes/detail-board/board-management/category-management/category-list.scene'
import { DetailCategoryScene } from './scenes/detail-board/board-management/category-management/detail-category.scene'
import { EditCategoryScene } from './scenes/detail-board/board-management/category-management/edit-category.scene'

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
    BoardUsersScene,
    RemoveBoardUserScene,
    CategoryManagementScene,
    CreateCategoryScene,
    CategoryListScene,
    DetailCategoryScene,
    EditCategoryScene,
  ],

  imports: [
    TelegrafModule.forRootAsync({
      botName: 'bot',
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        include: [BotModule],
        middlewares: [
          botMiddleware({
            password: process.env.DATABASE_PASSWORD,
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            database: process.env.DATABASE_SESSION_NAME,
          }),
          botMiddlewareResponseTime,
          botMiddlewareI18n({
            useSession: true,
            defaultLanguageOnMissing: true,
            directory: path.resolve(__dirname, '../../i18n/locales'),
            sessionName: process.env.DATABASE_SESSION_NAME,
            templateData: {},
            defaultLanguage: 'ru',
          }).middleware(),
        ],
      }),
    }),
    UsersModule,
    BoardModule,
    CurrencyModule,
    BoardUsersModule,
    CategoriesModule,
  ],
})
export class BotModule {
  constructor(
    @InjectBot(BotName) private bot: Telegraf<MyContext>,
  ) {
    this.bot.catch(console.error)
  }
}
