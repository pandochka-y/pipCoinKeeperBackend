import { Action, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { MyContext } from '../../../../bot.interface'
import { BotService } from '../../../../bot.service'
import { BUTTONS, COMMANDS, SCENES } from '../../../../bot.constants'
import { Pagination, addPrevScene, getButtonList, replyToMessage } from '../../../../bot.utils'
import { BoardService } from '../../../../../board/board.service'
import { CategoriesService } from '../../../../../categories/categories.service'

// TODO: detail category
@Scene(SCENES.CATEGORY_LIST)
export class CategoryListScene {
  constructor(
    private readonly botService: BotService,
    private readonly boardService: BoardService,
    private readonly categoryService: CategoriesService,
  ) {}

  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    const pagination = new Pagination(ctx, SCENES.CATEGORY_LIST, { limit: 3 })
    ctx.session.current_scene = SCENES.BOARD_LIST
    const user_id = await this.botService.getUserId(ctx)
    const board_id = this.botService.getBoardId(ctx)

    const categories = await this.categoryService.getAllBoardCategories({ ...pagination.dto, board_id })
    pagination.setCountItems(categories.count)
    const categoryButtonList = getButtonList(categories.rows, BUTTONS.TO_DETAIL_CATEGORY)
    const buttons = [
      ...categoryButtonList,
      [BUTTONS.PREV_PAGE(pagination.shouldPrev), BUTTONS.NEXT_PAGE(pagination.shouldNext)],
      [BUTTONS.BACK(), BUTTONS.MAIN_MENU],
    ]

    const inlineKeyboard = Markup.inlineKeyboard(buttons)
    await replyToMessage(ctx, `Категории доски: ${board_id}\n ${pagination.currentPage}/${pagination.countPages}`, inlineKeyboard)
  }

  @Action(COMMANDS.NEXT_PAGE)
  async onNextPage(ctx: MyContext) {
    const state = addPrevScene(ctx)
    state.current_page += 1
    console.log('state', state)
    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.CATEGORY_LIST,
      state,
      'У вас нет прав для просмотра категорий',
    )
  }

  @Action(COMMANDS.PREV_PAGE)
  async onPrevPage(ctx: MyContext) {
    const state = addPrevScene(ctx)
    if (state.current_page > 1)
      state.current_page -= 1
    await this.botService.guardEnterBoardScene(
      ctx,
      SCENES.CATEGORY_LIST,
      state,
      'У вас нет прав для просмотра категорий',
    )
  }

  @Action(COMMANDS.CREATE_BOARD)
  async onCreateBoard(ctx: MyContext) {
    await ctx.scene.enter(SCENES.CREATE_BOARD)
  }
}
