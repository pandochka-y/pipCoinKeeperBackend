import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'

import { BotService } from '../bot.service'
import { MyContext } from '../bot.interface'
import { COMMANDS, SCENES } from '../bot.constants'
import { BoardUsersService } from '../../board-users/board-users.service'
import { UsersService } from '../../users/users.service'
import { BoardService } from '../../board/board.service'

@Scene(SCENES.PAYMENT_MANAGEMENT)
export class PaymentManagementScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    console.log('scene payment management', ctx)
    await ctx.reply('scene payment management')
    // const board_id = ctx.match[1]
    // const user_id = await this.botService.getUserId(ctx)
    // const member = await this.boardUsersService.getBoardUserByIds(board_id, user_id)
    // const test = await canActivate(ctx, member.role.name, OPERATIONS.BOARD_MANAGEMENT)
    // if (!test)
    //   return false
    // const board = await this.boardService.getBoardById(board_id)
    // const buttons = [(user.boards?.length ? [BUTTONS.BOARDS, BUTTONS.CREATE_BOARD] : [BUTTONS.CREATE_BOARD]), [BUTTONS.BACK]]
    // const inlineKeyboard = Markup.inlineKeyboard(buttons)
    // await replyOrEdit(ctx, TEXT.BOARDS, inlineKeyboard)
  }

  @Action(COMMANDS.CREATE_BOARD)
  async onCreateBoard(ctx: MyContext) {
    await ctx.scene.enter(SCENES.CREATE_BOARD)
  }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: MyContext) {
    await this.botService.start(ctx)
    // const { scene, state } = backCallback(ctx, SCENES.BOARDS)
    // await ctx.scene.enter(scene, state)
  }
}
