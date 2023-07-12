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
    const { scene, state } = backToPrevScene(ctx)
    if (!scene) {
      await ctx.scene.leave()
      await this.botService.start(ctx)
      return
    }

    await this.botService.guardEnterScene(
      ctx,
      scene,
      state,
    )
  }

  @Action(COMMANDS.TO_DETAIL_BOARD_REGEX)
  async onGetDetailBoard(ctx: MyContext) {
    const board_id = Number(ctx.match[1])
    const state = addPrevScene(ctx)

    await this.botService.guardEnterScene(
      ctx,
      SCENES.DETAIL_BOARD,
      { ...state, detail_board: { board_id } },
      'Доска не найдена или доступ к данной доске закрыт',
    )
  }
}
