import { Action, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../../../bot.service'
import { MyContext } from '../../../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../../../bot.constants'
import { BoardUsersService } from '../../../../board-users/board-users.service'
import { UsersService } from '../../../../users/users.service'
import { BoardService } from '../../../../board/board.service'
import { addPrevScene, getState, replyToMessage } from '../../../bot.utils'

@Scene(SCENES.BOARD_MANAGEMENT)
export class BoardManagementScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    const { board_id, roleName } = ctx.scene.session.state.detail_board
    const board = await this.boardService.getBoardById(board_id)
    const user = await this.botService.getUser(ctx.from.id)

    const button = [
      [BUTTONS.BOARD_USERS(true)],
      [BUTTONS.EDIT_CURRENCY(true)],
      [BUTTONS.ADD_CATEGORY(true)],
      [user.active_board_id === board_id ? BUTTONS.REMOVE_FROM_FAVORITE(true) : BUTTONS.ADD_TO_FAVORITE(true)],
      [BUTTONS.BACK(), BUTTONS.MAIN_MENU],
    ]
    const inlineKeyboard = Markup.inlineKeyboard(button)
    await replyToMessage(ctx, `Управление доской: ${board.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.BOARD_USERS)
  async onBoardUsers(ctx: MyContext) {
    const state = addPrevScene(ctx)
    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.BOARD_USERS,
      state,
      'У вас нет прав для просмотра участников',
    )
  }

  @Action(COMMANDS.REMOVE_FROM_FAVORITE)
  async onRemoveFromFavorite(ctx: MyContext) {
    const user_id = await this.botService.getUserId(ctx)
    await this.userService.removeActiveBoard(user_id)
    const state = getState(ctx)
    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.BOARD_MANAGEMENT,
      state,
      'У вас нет прав для управления доской',
    )
  }

  @Action(COMMANDS.ADD_TO_FAVORITE)
  async onAddToFavorite(ctx: MyContext) {
    const { board_id } = ctx.scene.session.state.detail_board
    const user_id = await this.botService.getUserId(ctx)
    await this.userService.setActiveBoard(user_id, board_id)
    const state = getState(ctx)

    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.BOARD_MANAGEMENT,
      state,
      'У вас нет прав для управления доской',
    )
  }

  @Action(COMMANDS.CREATE_BOARD)
  async onCreateBoard(ctx: MyContext) {
    await ctx.scene.enter(SCENES.CREATE_BOARD)
  }
}
