import { Action, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf'
import { Telegraf } from 'telegraf'

import { UsersService } from '../users/users.service'

import { BotName, COMMANDS, SCENES } from './bot.constants'
import { BotService } from './bot.service'
import { createUserDtoFactory } from './bot.utils'
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
    await this.botService.start(ctx)
  }

  @Action(/detail-board\s(.*)/)
  async onGetDetailBoard(ctx: MyContext) {
    return await ctx.scene.enter(SCENES.DETAIL_BOARD, { testState: ctx.match[1] })
    // return await this.botService.getDetailBoard(ctx)
  }
}
