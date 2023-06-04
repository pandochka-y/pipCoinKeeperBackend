import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../bot.service'
import { MyContext } from '../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../bot.constants'
import { BoardUsersService } from '../../board-users/board-users.service'
import { UsersService } from '../../users/users.service'
import { BoardService } from '../../board/board.service'
import { OPERATIONS, canActivate, messageAccessDenied } from '../bot.guards'
import { replyOrEdit } from '../bot.utils'

@Scene(SCENES.DETAIL_BOARD)
export class DetailBoardScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    // TODO: initial state second arg
    console.log('scene detail', ctx.scene.state)
    const board_id = ctx.match[1] || 0
    const user_id = await this.botService.getUserId(ctx)
    const boardUser = await this.boardUsersService.getBoardUserByIds(board_id, user_id)
    if (!boardUser) {
      await messageAccessDenied(ctx, 'Доска не найдена или доступ к данной доске закрыт')
      return false
    }
    const shouldBoardManage = await canActivate(ctx, boardUser.role.name, OPERATIONS.BOARD_MANAGEMENT)
    const shouldPaymentManage = await canActivate(ctx, boardUser.role.name, OPERATIONS.PAYMENT_MANAGE)
    const board = await this.boardService.getBoardById(board_id)
    const buttons = [
      [BUTTONS.BOARD_REPORT, BUTTONS.BOARD_MANAGEMENT(shouldBoardManage)],
      [BUTTONS.PAYMENT_LIST],
      [BUTTONS.CREATE_PAYMENT(shouldPaymentManage)],
      [BUTTONS.BACK, BUTTONS.MAIN_MENU],

    ]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyOrEdit(ctx, `${board.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.BOARD_REPORT)
  async onReportAction(@Ctx() ctx: MyContext) {
    await ctx.scene.enter(SCENES.BOARD_REPORT)
  }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: MyContext) {
    await this.botService.start(ctx)
  }
}
