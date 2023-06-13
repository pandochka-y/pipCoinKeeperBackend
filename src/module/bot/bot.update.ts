import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'

import { UsersService } from '../users/users.service'

import { BotName, COMMANDS, SCENES } from './bot.constants'
import { BotService } from './bot.service'
import { addPrevScene, backToPrevScene, createUserDtoFactory } from './bot.utils'
import { MyContext } from './bot.interface'

@Update()
export class BotUpdate {
  constructor(
    @InjectBot(BotName)
    private readonly bot: Telegraf<MyContext>,
    private readonly botService: BotService,
    private readonly usersService: UsersService,
  ) {}

  @Start()
  async onStart(ctx: MyContext) {
    const createUserDto = createUserDtoFactory(ctx)
    await this.usersService.welcomeTelegramUser(createUserDto)
    ctx.session.messageId = undefined
    // TODO: add remove session
    await this.botService.start(ctx)
  }

  @Action(COMMANDS.MAIN_MENU)
  async onMainMenu(ctx: MyContext) {
    await this.botService.start(ctx)
  }

  @Action(COMMANDS.BOARD_LIST)
  async onGetBoards(ctx: MyContext) {
    await ctx.scene.enter(SCENES.BOARD_LIST)
  }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: MyContext) {
    if (!ctx.session.current_scene) {
      await this.botService.start(ctx)
      return
    }

    const { scene, state } = backToPrevScene(ctx)
    return await ctx.scene.enter(scene, state)
  }

  @Action(/detail-board\s(.*)/)
  async onGetDetailBoard(ctx: MyContext) {
    const board_id = ctx.match[1] || -1
    const state = addPrevScene(ctx)
    return await ctx.scene.enter(SCENES.DETAIL_BOARD, { ...state, board_id })
  }
}
