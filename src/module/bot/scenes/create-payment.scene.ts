import { Context, Message, Wizard, WizardStep } from 'nestjs-telegraf'

import { SCENES } from '../bot.constants'
import { BotService } from '../bot.service'
import { MyContext } from '../bot.interface'
import { CreateBoardDto } from '../../board/dto/create-board.dto'
import { CurrencyService } from '../../currency/currency.service'
import { BoardUsersService } from '../../board-users/board-users.service'
import { UsersService } from '../../users/users.service'

@Wizard(SCENES.CREATE_PAYMENT)
export class CreatePaymentScene {
  constructor(
    private readonly botService: BotService,
    private readonly currencyService: CurrencyService,
    private readonly boardUserService: BoardUsersService,
    private readonly usersService: UsersService,
  ) {}

  @WizardStep(1)
  async init(@Context() ctx: MyContext) {
    await ctx.reply('Введите сумму:')
    ctx.wizard.next()
  }

  @WizardStep(2)
  async enterAmount(@Message('text') text: string, @Context() ctx: MyContext) {
    const user = await this.botService.getUser(ctx.from.id)
    ctx.scene.session.should_favorite = !user.active_board_id
    ctx.scene.session.create_board = {
      name: text,
      user_id: user.id,
    }
    await ctx.reply('Введите категорию:')
    ctx.wizard.next()
  }

  @WizardStep(3)
  async enterCategory(@Message('text') text: string, @Context() ctx: MyContext) {
    const currency = await this.currencyService.getCurrencyByCodeOrSymbol(text.toUpperCase())
    if (!currency) {
      await ctx.replyWithMarkdownV2('Валюта не найдена \nПопробуйте еще раз')
      ctx.wizard.selectStep(2)
      return
    }
    ctx.scene.session.create_board.currency_id = currency.id
    await ctx.reply('Введите общий лимит доски:')
    ctx.wizard.next()
  }

  @WizardStep(4)
  async enterAmountLimit(@Message('text') text: string, @Context() ctx: MyContext) {
    const limit = Number(text) || 0
    const createBoardDto = {
      ...ctx.scene.session.create_board,
      amount_limit: limit,
    } as CreateBoardDto
    try {
      const board = await this.botService.createBoard(createBoardDto)
      const boardUserDto = {
        board_id: board.id,
        user_id: ctx.scene.session.create_board.user_id,
        role_id: 1,
      }

      await this.boardUserService.createBoardUser(boardUserDto)
      await ctx.reply(`Доска ${board.name} ${board.id} создана`)

      if (ctx.scene.session.should_favorite) {
        await this.usersService.setActiveBoard(board.user_id, board.id)
        await ctx.reply(`Доска ${board.name} выбрана по умолчанию`)
      }

      ctx.session.messageId = undefined
      await this.botService.start(ctx)
      await ctx.scene.leave()
    }
    catch (e) {
      await ctx.reply(`${e.message}`)
    }
  }
}
