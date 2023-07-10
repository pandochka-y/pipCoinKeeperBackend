import { Context, Message, Wizard, WizardStep } from 'nestjs-telegraf'

import { SCENES } from '../../../bot.constants'
import { BotService } from '../../../bot.service'
import { MyContext } from '../../../bot.interface'
import { CurrencyService } from '../../../../currency/currency.service'
import { BoardUsersService } from '../../../../board-users/board-users.service'
import { UsersService } from '../../../../users/users.service'

@Wizard(SCENES.CREATE_PAYMENT)
export class CreatePaymentScene {
  constructor(
    private readonly botService: BotService,
    private readonly currencyService: CurrencyService,
    private readonly boardUserService: BoardUsersService,
    private readonly usersService: UsersService,
  ) {}

  @WizardStep(1)
  async init(@Context() ctx: MyContext) {
    await ctx.reply('Введите сумму:')
    ctx.wizard.next()
  }

  @WizardStep(2)
  async enterAmount(@Message('text') text: string, @Context() ctx: MyContext) {
    const user = await this.botService.getCurrentUser(ctx)
    await ctx.reply('Введите категорию:')
    ctx.wizard.next()
  }

  @WizardStep(3)
  async enterCategory(@Message('text') text: string, @Context() ctx: MyContext) {
  }

  @WizardStep(4)
  async enterAmountLimit(@Message('text') text: string, @Context() ctx: MyContext) {
  }
}
