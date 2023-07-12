import { Action, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { MyContext } from '../../../../bot.interface'
import { BotService } from '../../../../bot.service'
import { BUTTONS, COMMANDS, SCENES } from '../../../../bot.constants'
import { Pagination, addPrevScene, getButtonList, getState, replyToMessage } from '../../../../bot.utils'
import { BoardService } from '../../../../../board/board.service'
import { CategoriesService } from '../../../../../categories/categories.service'

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
    ctx.session.current_scene = SCENES.CATEGORY_LIST
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
    await replyToMessage(ctx, `Категории доски: ${board_id}\nКол-во: ${categories.count}\n${pagination.currentPage}/${pagination.countPages}`, inlineKeyboard)
  }

  @Action(COMMANDS.NEXT_PAGE)
  async onNextPage(ctx: MyContext) {
    const state = getState(ctx)
    state.current_page += 1
    console.log('state', state)
    await this.botService.guardEnterScene(
      ctx,
      SCENES.CATEGORY_LIST,
      state,
      'У вас нет прав для просмотра категорий',
    )
  }

  @Action(COMMANDS.PREV_PAGE)
  async onPrevPage(ctx: MyContext) {
    const state = getState(ctx)
    if (state.current_page > 1)
      state.current_page -= 1
    await this.botService.guardEnterScene(
      ctx,
      SCENES.CATEGORY_LIST,
      state,
      'У вас нет прав для просмотра категорий',
    )
  }

  // TODO: detail category
  @Action(COMMANDS.TO_DETAIL_CATEGORY_REGEX)
  async onToDetailCategory(ctx: MyContext) {
    const category_id = Number(ctx.match[1]) || -1
    const state = addPrevScene(ctx)
    state.category_id = category_id
    await this.botService.guardEnterScene(
      ctx,
      SCENES.DETAIL_CATEGORY,
      state,
      'У вас нет прав для просмотра категорий',
    )
  }
}
