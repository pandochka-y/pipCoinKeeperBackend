import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../bot.service'
import { MyContext } from '../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../bot.constants'
import { BoardUsersService } from '../../board-users/board-users.service'
import { UsersService } from '../../users/users.service'
import { BoardService } from '../../board/board.service'
import { OPERATIONS, canActivate } from '../bot.guards'
import { addPrevScene, replyToMessage } from '../bot.utils'

@Scene(SCENES.DETAIL_BOARD)
export class DetailBoardScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {
  }

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: MyContext) {
    console.log('scene state', ctx.scene.state)
    console.log('scene session state', ctx.scene.session.state)
    const { board_id, roleName } = ctx.scene.session.state.detail_board

    const canBoardManage = canActivate(roleName, OPERATIONS.BOARD_MANAGEMENT)
    const canPaymentManage = canActivate(roleName, OPERATIONS.PAYMENT_MANAGE)

    const board = await this.boardService.getBoardById(board_id)
    const buttons = [
      [BUTTONS.BOARD_REPORT, BUTTONS.BOARD_MANAGEMENT(canBoardManage)],
      [BUTTONS.PAYMENT_MANAGEMENT(canPaymentManage)],
      [BUTTONS.BACK(), BUTTONS.MAIN_MENU],
    ]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyToMessage(ctx, `Детальная: ${board.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.BOARD_REPORT)
  async onReportAction(@Ctx() ctx: MyContext) {
    console.log('state onReportAction', ctx.scene.session.state)
    const state = addPrevScene(ctx)
    // FIXME: when changed state, will change ctx
    state.detail_board.board_id = 21
    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.BOARD_REPORT,
      state,
      'доступ закрыт',
    )
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
