import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../bot.service'
import { MyContext } from '../bot.interface'
import { BUTTONS, COMMANDS, SCENES, TEXT } from '../bot.constants'
import { getListButton, replyToMessage } from '../bot.utils'
import { BoardService } from '../../board/board.service'

@Scene(SCENES.BOARD_LIST)
export class BoardListScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    ctx.session.current_scene = SCENES.BOARD_LIST
    const user = await this.botService.getUser(ctx.from.id)
    const boards = await this.boardService.getAllBoardsByUser({ user_id: user.id })
    const boardButtonList = getListButton(boards, BUTTONS.TO_DETAIL_BOARD)
    const buttons = [...boardButtonList, [BUTTONS.BACK, BUTTONS.CREATE_BOARD]]

    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyToMessage(ctx, TEXT.BOARDS, inlineKeyboard)
    // await this.botService.getBoards(ctx)
  }

  @Action(COMMANDS.CREATE_BOARD)
  async onCreateBoard(ctx: MyContext) {
    await ctx.scene.enter(SCENES.CREATE_BOARD)
  }

  // @Action(/detail-board\s(.*)/)
  // async onGetDetailBoard(ctx: MyContext) {
  //   const board_id = ctx.match[1] || -1
  //
  //   const state = addPrevScene(ctx, SCENES.BOARD_LIST)
  //   return await ctx.scene.enter(SCENES.DETAIL_BOARD, state)
  //
  //   // return await this.botService.getDetailBoard(ctx)
  // }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: MyContext) {
    await this.botService.start(ctx)
    // const { scene, state } = backCallback(ctx, SCENES.BOARDS)
    // await ctx.scene.enter(scene, state)
  }
}
