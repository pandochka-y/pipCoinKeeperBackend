import { Context, Message, Wizard, WizardStep } from 'nestjs-telegraf'

import { SCENES } from '../../bot.constants'
import { BotService } from '../../bot.service'
import { MyContext } from '../../bot.interface'
import { CreateBoardDto } from '../../../board/dto/create-board.dto'
import { CurrencyService } from '../../../currency/currency.service'
import { BoardUsersService } from '../../../board-users/board-users.service'
import { UsersService } from '../../../users/users.service'
import { CreateBoardUserDto } from '../../../board-users/dto/create-board-user.dto'

@Wizard(SCENES.CREATE_BOARD)
export class CreateBoardScene {
  constructor(
    private readonly botService: BotService,
    private readonly currencyService: CurrencyService,
    private readonly boardUserService: BoardUsersService,
    private readonly usersService: UsersService,
  ) {}

  @WizardStep(1)
  async step0(@Context() ctx: MyContext) {
    await ctx.reply('Введите название доски:')
    ctx.wizard.next()
  }

  @WizardStep(2)
  async step1(@Message('text') text: string, @Context() ctx: MyContext) {
    const user = await this.botService.getUser(ctx.from.id)
    const shouldBeFavorite = !user.active_board_id

    ctx.scene.session.create.board = {
      should_favorite: shouldBeFavorite,
      data: {
        name: text,
        user_id: user.id,
      },
    }

    await ctx.reply('Введите символ или код валюты:')
    ctx.wizard.next()
  }

  @WizardStep(3)
  async step3(@Message('text') text: string, @Context() ctx: MyContext) {
    const currency = await this.currencyService.getCurrencyByCodeOrSymbol(text.toUpperCase())
    if (!currency) {
      await ctx.reply('Валюта не найдена \nПопробуйте еще раз')
      await ctx.wizard.selectStep(2)
      return
    }
    ctx.scene.session.create.board.data.currency_id = currency.id
    await ctx.reply('Введите лимит:')
    ctx.wizard.next()
  }

  @WizardStep(4)
  async step4(@Message('text') text: string, @Context() ctx: MyContext) {
    const limit = Number(text) || 0
    const { data, should_favorite } = ctx.scene.session.create.board
    const createBoardDto = {
      ...data,
      amount_limit: limit,
    } as CreateBoardDto

    try {
      const board = await this.botService.createBoard(createBoardDto)
      const user_id = await this.botService.getUserId(ctx)
      const boardUserDto: CreateBoardUserDto = {
        user_id,
        board_id: board.id,
        role_id: 1,
      }
      await this.boardUserService.createBoardUser(boardUserDto)
      await ctx.reply(`Доска ${board.name} ${board.id} создана`)

      if (should_favorite) {
        await this.usersService.setActiveBoard(board.user_id, board.id)
        await ctx.reply(`Доска ${board.name} выбрана по умолчанию`)
      }

      ctx.session.messageId = undefined
      await ctx.scene.leave()
      await this.botService.start(ctx)
    }
    catch (e) {
      await ctx.reply(`${e.message}`)
    }
  }
}
