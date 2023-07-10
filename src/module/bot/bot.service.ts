import { Injectable } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'
import { Markup, Telegraf } from 'telegraf'

import { UsersService } from '../users/users.service'
import { CreateBoardDto } from '../board/dto/create-board.dto'
import { BoardService } from '../board/board.service'
import { BoardUsersService } from '../board-users/board-users.service'
import { BoardUser } from '../board-users/board-users.model'

import { BUTTONS, BotName, SCENES, TEXT } from './bot.constants'
import { replyToMessage } from './bot.utils'
import { MyContext, MySession } from './bot.interface'
import { OPERATIONS, canActivate, messageAccessDenied, valueOf } from './bot.guards'

@Injectable()
export class BotService {
  constructor(
    @InjectBot(BotName)
    private readonly bot: Telegraf<MyContext>,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardService,
    private readonly boardUserService: BoardUsersService,
  ) {}

  async start(ctx: MyContext) {
    ctx.session.current_scene = undefined
    await ctx.scene.leave()
    console.log('I18n:', ctx.i18n.t('errors.test', { test: '3333' }))
    const user = await this.usersService.getUserByTelegramId(ctx.from.id)
    ctx.session.user_id = user.id
    const buttons = [[BUTTONS.TO_ACTIVE_BOARD(user.active_board_id)], [BUTTONS.BOARD_LIST]]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    return await replyToMessage(ctx, (user.active_board_id && user.active_board) ? TEXT.BOARD_STATISTICS(user.active_board) : TEXT.START, inlineKeyboard)
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
    if (ctx.session.user_id)
      return ctx.session.user_id

    const user = await this.usersService.getUserByTelegramId(ctx.from.id)
    ctx.session.user_id = user.id
    return user.id
  }

  async getCurrentUser(ctx: MyContext) {
    const user_id = await this.getUserId(ctx)
    const user = await this.usersService.getUserById(user_id)
    return user
  }

  getBoardId(ctx: MyContext) {
    return ctx.scene.session.state.detail_board.board_id || -1
  }

  getCurrentBoard(ctx: MyContext) {
    const board_id = this.getBoardId(ctx)
    return this.boardsService.getBoardById(board_id)
  }

  async guardAction(
    board_user_id: number,
    action: valueOf<typeof OPERATIONS>,
  ) {
    const boardUser = await this.boardUserService.getBoardUserById(board_user_id)
    if (!boardUser)
      return false
    return canActivate(boardUser.role.name, action)
  }

  async guardEnterBoardScene(ctx: MyContext, scene: valueOf<typeof SCENES>, initialState: MySession['state'], errorMsg = 'У вас нет прав для просмотра') {
    console.log('enter guard scene', initialState, scene)
    let boardUser: BoardUser | null = null
    const user_id = await this.getUserId(ctx)
    const board_id = initialState.detail_board.board_id

    console.log('state guardEnterScene', ctx.scene.session.state)
    if (board_id)
      boardUser = await this.boardUserService.getBoardUserByBoardAndUserId(board_id, user_id)

    if (!boardUser) {
      await messageAccessDenied(ctx, errorMsg)
      return false
    }

    ctx.session.current_scene = scene
    initialState.detail_board.roleName = boardUser.role.name
    initialState.detail_board.board_user_id = boardUser.id
    console.log('enter scene', scene)
    ctx.scene.enter(scene, initialState)
  }
}
