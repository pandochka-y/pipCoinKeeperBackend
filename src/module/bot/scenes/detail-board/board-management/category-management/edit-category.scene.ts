import { Action, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../../../../bot.service'
import { MyContext } from '../../../../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../../../../bot.constants'
import { addPrevScene, getState, replyToMessage } from '../../../../bot.utils'
import { CategoriesService } from '../../../../../categories/categories.service'
import { messageAccessDenied } from '../../../../bot.guards'

@Scene(SCENES.EDIT_CATEGORY)
export class DetailEditCategoryScene {
  constructor(
    private readonly botService: BotService,
    private readonly categoriesService: CategoriesService,
  ) {}

  // TODO: detail delete/edit category
  @SceneEnter()
  async onSceneEnter(ctx: MyContext) {
    const { category_id } = getState(ctx)
    const category = await this.categoriesService.getCategoryById(category_id)

    if (!category) {
      await messageAccessDenied(ctx, 'Категория не найдена')
      return
    }

    const button = [
      [BUTTONS.EDIT_CATEGORY_NAME(true)],
      [BUTTONS.EDIT_CATEGORY_MCC(true)],
      [BUTTONS.EDIT_CATEGORY_LIMIT(true)],
      [BUTTONS.BACK(), BUTTONS.MAIN_MENU],
    ]
    const inlineKeyboard = Markup.inlineKeyboard(button)

    await replyToMessage(ctx, `Категория: ${category.name}`, inlineKeyboard)
  }

  @Action(COMMANDS.EDIT)
  async onEditCategory(ctx: MyContext) {
    const state = addPrevScene(ctx)
    await this.botService.guardEnterScene(
      ctx,
      SCENES.EDIT_CATEGORY,
      state,
      'У вас нет прав для редактирования категории',
    )
  }
}
