import { Action, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../../../bot.service'
import { MyContext } from '../../../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../../../bot.constants'
import { BoardUsersService } from '../../../../board-users/board-users.service'
import { UsersService } from '../../../../users/users.service'
import { BoardService } from '../../../../board/board.service'
import { replyToMessage } from '../../../bot.utils'

@Scene(SCENES.REMOVE_BOARD_USER)
export class RemoveBoardUserScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    const { board_id } = ctx.scene.session.state.detail_board
    const board = await this.boardService.getBoardById(board_id)
    const user = await this.botService.getUser(ctx.from.id)

    const button = [
      [BUTTONS.ADD_BOARD_USER(true)],
      [BUTTONS.REMOVE_BOARD_USER(true)],
      [BUTTONS.BACK(), BUTTONS.MAIN_MENU],
    ]
    const inlineKeyboard = Markup.inlineKeyboard(button)
    await replyToMessage(ctx, `Удаление участника доски ${board.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.CREATE_BOARD)
  async onCreateBoard(ctx: MyContext) {
    await ctx.scene.enter(SCENES.CREATE_BOARD)
  }
}
