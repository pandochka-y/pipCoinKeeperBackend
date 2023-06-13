import { Action, Scene, SceneEnter } from 'nestjs-telegraf'

import { BotService } from '../bot.service'
import { MyContext } from '../bot.interface'
import { COMMANDS, SCENES } from '../bot.constants'
import { BoardUsersService } from '../../board-users/board-users.service'
import { UsersService } from '../../users/users.service'
import { BoardService } from '../../board/board.service'
import { OPERATIONS, canActivate, messageAccessDenied } from '../bot.guards'

@Scene(SCENES.BOARD_MANAGEMENT)
export class BoardManagementScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  // TODO: create management panel
  async onSceneEnter(ctx: MyContext) {
    const state = ctx.scene.session.state
    const user_id = await this.botService.getUserId(ctx)
    const boardUser = await this.boardUsersService.getBoardUserByIds(state.board_id, user_id)
    if (!boardUser) {
      await messageAccessDenied(ctx, 'Доступ к данной функции ограничен')
      return false
    }
    const shouldBoardManagement = canActivate(ctx, boardUser.role.name, OPERATIONS.BOARD_MANAGEMENT)
    const canEditCurrency = canActivate(ctx, boardUser.role.name, OPERATIONS.EDIT_CURRENCY)
    // TODO: create management panel
    await ctx.reply('scene board management')
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
}
