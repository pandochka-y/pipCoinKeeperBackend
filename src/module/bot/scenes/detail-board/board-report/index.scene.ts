import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf'

import { BotService } from '../../../bot.service'
import { MyContext } from '../../../bot.interface'
import { COMMANDS, SCENES } from '../../../bot.constants'
import { BoardUsersService } from '../../../../board-users/board-users.service'
import { UsersService } from '../../../../users/users.service'
import { BoardService } from '../../../../board/board.service'

@Scene(SCENES.BOARD_REPORT)
export class BoardReportScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardUsersService: BoardUsersService,
    private readonly userService: UsersService,
    private readonly boardService: BoardService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    console.log('scene report board', ctx.scene.session)
    await ctx.reply('scene report board')
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
