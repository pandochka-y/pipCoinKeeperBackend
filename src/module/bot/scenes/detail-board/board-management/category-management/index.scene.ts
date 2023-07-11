import { Action, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../../../../bot.service'
import { MyContext } from '../../../../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../../../../bot.constants'
import { BoardUsersService } from '../../../../../board-users/board-users.service'
import { UsersService } from '../../../../../users/users.service'
import { BoardService } from '../../../../../board/board.service'
import { addPrevScene, replyToMessage } from '../../../../bot.utils'

@Scene(SCENES.CATEGORY_MANAGEMENT)
export class CategoryManagementScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    const { board_id } = ctx.scene.session.state.detail_board
    const board = await this.botService.getCurrentBoard(ctx)
    const user = await this.botService.getCurrentUser(ctx)

    const button = [
      [BUTTONS.CREATE_CATEGORY(true)],
      [BUTTONS.CATEGORY_LIST(true)],
      [BUTTONS.BACK(), BUTTONS.MAIN_MENU],
    ]
    const inlineKeyboard = Markup.inlineKeyboard(button)
    await replyToMessage(ctx, `Управление категориями доски: ${board.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.CREATE_CATEGORY)
  async onCreateCategory(ctx: MyContext) {
    const state = addPrevScene(ctx)
    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.CREATE_CATEGORY,
      state,
      'У вас нет прав для создания категории',
    )
  }

  @Action(COMMANDS.CATEGORY_LIST)
  async onCategoryList(ctx: MyContext) {
    const state = addPrevScene(ctx)
    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.CATEGORY_LIST,
      state,
      'У вас нет прав для просмотра категорий',
    )
  }
}
