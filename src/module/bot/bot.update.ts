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
    console.log('state onBackAction', ctx.scene.session.state)
    const { scene, state } = backToPrevScene(ctx)
    console.log('states', scene, state)
    if (!scene) {
      await this.botService.start(ctx)
      return
    }

    // FIXME: add on prev scene action
    await this.botService.guardEnterScene(
      ctx,
      SCENES.DETAIL_BOARD,
      state,
      'Что-то пошло не так',
    )
    return await ctx.scene.enter(scene, state, true)
  }

  @Action(/detail-board\s(.*)/)
  async onGetDetailBoard(ctx: MyContext) {
    const board_id = Number(ctx.match[1]) || -1
    const state = addPrevScene(ctx)

    console.log('state onGetDetailBoard', ctx.scene.session.state)
    await this.botService.guardEnterScene(
      ctx,
      SCENES.DETAIL_BOARD,
      { ...state, detail_board: { board_id } },
      'Доска не найдена или доступ к данной доске закрыт',
    )
    // return await ctx.scene.enter(SCENES.DETAIL_BOARD, { ...state, detail_board: { board_id } })
  }
}
