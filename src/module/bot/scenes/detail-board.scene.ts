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
    const board_id = ctx.scene.session.state.board_id
    const user = await this.botService.getUser(ctx.from.id)
    const boardUser = await this.boardUsersService.getBoardUserByIds(board_id, user.id)
    if (!boardUser) {
      await messageAccessDenied(ctx, 'Доска не найдена или доступ к данной доске закрыт')
      return false
    }
    ctx.scene.session.state.boardUser = {
      role: boardUser.role.name,
    }

    const shouldBoardManage = canActivate(ctx, boardUser.role.name, OPERATIONS.BOARD_MANAGEMENT)
    const shouldPaymentManage = canActivate(ctx, boardUser.role.name, OPERATIONS.PAYMENT_MANAGE)
    const board = await this.boardService.getBoardById(board_id)
    console.log('board', board)
    const buttons = [
      [BUTTONS.BOARD_REPORT, BUTTONS.BOARD_MANAGEMENT(shouldBoardManage)],
      [BUTTONS.PAYMENT_MANAGEMENT(shouldPaymentManage)],
      [BUTTONS.BACK, BUTTONS.MAIN_MENU],
    ]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyOrEdit(ctx, `Детальная: ${board.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.BOARD_REPORT)
  async onReportAction(@Ctx() ctx: MyContext) {
    await ctx.scene.enter(SCENES.BOARD_REPORT)
  }

  @Action(COMMANDS.PAYMENT_LIST)
  async onPaymentListAction(@Ctx() ctx: MyContext) {
    await ctx.scene.enter(SCENES.PAYMENT_LIST)
  }

  @Action(COMMANDS.CREATE_PAYMENT)
  async onCreatePaymentAction(@Ctx() ctx: MyContext) {
    await ctx.scene.enter(SCENES.CREATE_PAYMENT)
  }

  @Action(COMMANDS.PAYMENT_MANAGEMENT)
  async onPaymentManagementAction(@Ctx() ctx: MyContext) {
    await ctx.scene.enter(SCENES.PAYMENT_MANAGEMENT)
  }

  @Action(COMMANDS.BOARD_MANAGEMENT)
  async onBoardManagementAction(@Ctx() ctx: MyContext) {
    // TODO: add on prev scene action
    await ctx.scene.enter(SCENES.BOARD_MANAGEMENT, ctx.scene.session.state)
  }
}
