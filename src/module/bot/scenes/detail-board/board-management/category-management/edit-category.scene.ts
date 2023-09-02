import { Action, On, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'

import { BotService } from '../../../../bot.service'
import { MyContext } from '../../../../bot.interface'
import { BUTTONS, COMMANDS, SCENES } from '../../../../bot.constants'
import { deleteMessage, getState, replyToMessage } from '../../../../bot.utils'
import { CategoriesService } from '../../../../../categories/categories.service'
import { messageAccessDenied } from '../../../../bot.guards'

@Scene(SCENES.EDIT_CATEGORY)
export class EditCategoryScene {
  constructor(
    private readonly botService: BotService,
    private readonly categoriesService: CategoriesService,
  ) {}

  // TODO: edit category
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

  @Action(COMMANDS.EDIT_CATEGORY_NAME)
  async onEditCategoryName(ctx: MyContext) {
    const state = getState(ctx)
    state.action = COMMANDS.EDIT_CATEGORY_NAME
    const button = [
      BUTTONS.CANCEL,
    ]
    const inlineKeyboard = Markup.inlineKeyboard(button)
    await replyToMessage(ctx, 'Введите новое название категории:', inlineKeyboard, true)
  }

  @Action(COMMANDS.EDIT_CATEGORY_MCC)
  async onEditCategoryMCC(ctx: MyContext) {
    const state = getState(ctx)
    state.action = COMMANDS.EDIT_CATEGORY_MCC
    const button = [
      BUTTONS.CANCEL,
    ]
    const inlineKeyboard = Markup.inlineKeyboard(button)
    await replyToMessage(ctx, 'Введите новый mcc:', inlineKeyboard, true)
    // await ctx.reply('Введите новый mcc:')
  }

  @Action(COMMANDS.EDIT_CATEGORY_LIMIT)
  async onEditCategoryLimit(ctx: MyContext) {
    const state = getState(ctx)
    state.action = COMMANDS.EDIT_CATEGORY_LIMIT
    const button = [
      BUTTONS.CANCEL,
    ]
    const inlineKeyboard = Markup.inlineKeyboard(button)
    await replyToMessage(ctx, 'Введите новый лимит:', inlineKeyboard, true)
  }

  @Action(COMMANDS.CANCEL)
  async onCancel(ctx: MyContext) {
    const state = getState(ctx)
    state.action = undefined
    return await deleteMessage(ctx)
  }

  @On(['message'])
  async onText(ctx: MyContext) {
    console.log(ctx)
    const state = getState(ctx)
    if (!state.action)
      return
    await ctx.reply(`ответ принят ${state.action}`)
    state.action = undefined
  }
}
