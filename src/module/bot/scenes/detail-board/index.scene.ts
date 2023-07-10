import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../../bot.service'
import { MyContext } from '../../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../../bot.constants'
import { BoardUsersService } from '../../../board-users/board-users.service'
import { UsersService } from '../../../users/users.service'
import { BoardService } from '../../../board/board.service'
import { OPERATIONS, canActivate } from '../../bot.guards'
import { addPrevScene, replyToMessage } from '../../bot.utils'

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
    const { board_id, roleName } = ctx.scene.session.state.detail_board

    const canBoardManage = canActivate(roleName, OPERATIONS.BOARD_MANAGEMENT)
    const canPaymentManage = canActivate(roleName, OPERATIONS.PAYMENT_MANAGE)

    const board = await this.boardService.getBoardById(board_id)
    const buttons = [
      [BUTTONS.BOARD_REPORT, BUTTONS.BOARD_MANAGEMENT(canBoardManage)],
      [BUTTONS.PAYMENT_MANAGEMENT(canPaymentManage)],
      [BUTTONS.BACK('Назад')],
    ]

    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyToMessage(ctx, `Детальная: ${board.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.BOARD_REPORT)
  async onReportAction(@Ctx() ctx: MyContext) {
    const state = addPrevScene(ctx)

    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.BOARD_REPORT,
      state,
      'У вас нет прав для просмотра отчета',
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
    const state = addPrevScene(ctx)

    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.BOARD_MANAGEMENT,
      state,
      'У вас нет прав для управления доской',
    )
  }
}
