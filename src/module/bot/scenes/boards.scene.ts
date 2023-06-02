import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../bot.service'
import { MyContext } from '../bot.interface'
import { BUTTONS, COMMANDS, SCENES, TEXT } from '../bot.constants'
import { replyOrEdit } from '../bot.utils'

@Scene(SCENES.BOARDS)
export class BoardsScene {
  constructor(
    private readonly botService: BotService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    const user = await this.botService.getUser(ctx.from.id)
    const buttons = [(user.boards?.length ? [BUTTONS.BOARDS] : [BUTTONS.CREATE_BOARD]), [BUTTONS.BACK]]
    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyOrEdit(ctx, TEXT.BOARDS, inlineKeyboard)
    // await this.botService.getBoards(ctx)
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

  // TODO: enter scene to detail board
}
