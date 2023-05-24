import { Injectable } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'
import { Markup, Telegraf } from 'telegraf'

import { UsersService } from '../users/users.service'
import { CreateBoardDto } from '../board/dto/create-board.dto'
import { BoardService } from '../board/board.service'

import { BUTTONS, BotName, TEXT } from './bot.constants'
import { replyOrEdit } from './bot.utils'
import { MySceneContext } from './bot.interface'

@Injectable()
export class BotService {
  constructor(
    @InjectBot(BotName)
    private readonly bot: Telegraf<MySceneContext>,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardService,
  ) {}

  async start(ctx: MySceneContext) {
    const user = await this.usersService.getUserByTelegramId(ctx.from.id)
    const buttons = [user.active_board ? [BUTTONS.TO_ACTIVE_BOARD] : [], [BUTTONS.BOARDS]]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    return await replyOrEdit(ctx, TEXT.START, inlineKeyboard)
  }

  async getBoards(ctx: MySceneContext) {
    await ctx.reply('boards')
  }

  async getActiveBoard(ctx: MySceneContext) {
    await ctx.reply('active board')
  }

  async getDetailBoard(ctx: MySceneContext) {
    await ctx.reply('detail board')
  }

  async createBoard(dto: CreateBoardDto) {
    return await this.boardsService.createBoard(dto)
  }

  async getUser(id: number) {
    return await this.usersService.getUserByTelegramId(id)
  }
}
