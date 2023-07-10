import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../../bot.service'
import { MyContext } from '../../bot.interface'
import { BUTTONS, COMMANDS, SCENES, TEXT } from '../../bot.constants'
import { getButtonList, replyToMessage } from '../../bot.utils'
import { BoardService } from '../../../board/board.service'

@Scene(SCENES.BOARD_LIST)
export class BoardListScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    ctx.session.current_scene = SCENES.BOARD_LIST
    const user_id = await this.botService.getUserId(ctx)
    const boards = await this.boardService.getAllBoardsByUser({ user_id })

    const boardButtonList = getButtonList(boards, BUTTONS.TO_DETAIL_BOARD)
    const buttons = [...boardButtonList, [BUTTONS.BACK(), BUTTONS.CREATE_BOARD]]

    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyToMessage(ctx, TEXT.BOARDS, inlineKeyboard)
  }

  @Action(COMMANDS.CREATE_BOARD)
  async onCreateBoard(ctx: MyContext) {
    await ctx.scene.enter(SCENES.CREATE_BOARD)
  }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: MyContext) {
    await this.botService.start(ctx)
  }
}
