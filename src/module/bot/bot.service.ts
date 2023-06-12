import { Injectable } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'
import { Markup, Telegraf } from 'telegraf'

import { UsersService } from '../users/users.service'
import { CreateBoardDto } from '../board/dto/create-board.dto'
import { BoardService } from '../board/board.service'

import { BUTTONS, BotName, TEXT } from './bot.constants'
import { replyOrEdit } from './bot.utils'
import { MyContext } from './bot.interface'

@Injectable()
export class BotService {
  constructor(
    @InjectBot(BotName)
    private readonly bot: Telegraf<MyContext>,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardService,
  ) {}

  async start(ctx: MyContext) {
    ctx.session.current_scene = undefined
    const user = await this.usersService.getUserByTelegramId(ctx.from.id)
    console.log('id active board', user.active_board)
    const buttons = [[BUTTONS.TO_ACTIVE_BOARD(user.active_board_id)], [BUTTONS.BOARD_LIST]]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    return await replyOrEdit(ctx, user.active_board ? TEXT.BOARD_STATISTICS(user.active_board) : TEXT.START, inlineKeyboard)
  }

  async getBoards(ctx: MyContext) {
    await ctx.reply('boards')
  }

  async getActiveBoard(ctx: MyContext) {
    await ctx.reply('active board')
  }

  async getDetailBoard(ctx: MyContext) {
    const id = parseInt(ctx.match[1])
    if (!id) {
      await ctx.reply('detail board')
      return
    }
    const board = await this.boardsService.getBoardById(id)
    await ctx.replyWithHTML('detail board ')
  }

  async createBoard(dto: CreateBoardDto) {
    return await this.boardsService.createBoard(dto)
  }

  async getUserId(ctx: MyContext) {
    let user_id = ctx.session.user_id
    if (user_id)
      return user_id

    const user = await this.usersService.getUserByTelegramId(ctx.from.id)
    user_id = user.id
    return user_id
  }

  async getUser(id: number) {
    return await this.usersService.getUserByTelegramId(id)
  }
}
