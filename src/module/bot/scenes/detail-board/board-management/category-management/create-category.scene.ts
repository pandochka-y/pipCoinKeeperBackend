import { Context, Message, Wizard, WizardStep } from 'nestjs-telegraf'

import { SCENES } from '../../../../bot.constants'
import { MyContext } from '../../../../bot.interface'
import { BotService } from '../../../../bot.service'
import { CategoriesService } from '../../../../../categories/categories.service'

@Wizard(SCENES.CREATE_CATEGORY)
export class CreateCategoryScene {
  constructor(
    private readonly botService: BotService,
    private readonly categoryService: CategoriesService,
  ) {}

  @WizardStep(1)
  async step0(@Context() ctx: MyContext) {
    await ctx.reply('Введите название категории:')
    ctx.wizard.next()
  }

  @WizardStep(2)
  async step1(@Message('text') text: string, @Context() ctx: MyContext) {
    const nameCategory = text.trim()
    const board_id = this.botService.getBoardId(ctx)
    try {
      const category = await this.categoryService.createCategory({ name: nameCategory, board_id })
      await ctx.reply(`Категория ${category.name} создана`)
    }
    catch (e) {

    }
    ctx.session.messageId = undefined
    await this.botService.start(ctx)
  }
}
