import { ExtraEditMessageText } from 'telegraf/typings/telegram-types'
import { Markup } from 'telegraf'

import { CreateUserTelegramDto } from '../users/dto/create-user.dto'
import { GetCategoryListDto } from '../categories/dto/get-category-list.dto'

import { MyContext, MySession } from './bot.interface'
import { SCENES } from './bot.constants'

export function createUserDtoFactory(ctx: MyContext): CreateUserTelegramDto {
  return {
    telegram_id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name || null,
  }
}

export async function replyToMessage(
  ctx: MyContext,
  text: string,
  extra: ExtraEditMessageText,
  newMessage = false,
) {
  const messageId = ctx.update.callback_query?.message.message_id || ctx.session.messageId
  /*
  * to fix the application crash on error 400: Bad Request: message is not modified,
  * when a scene is called from an old message
  * if on action "onBackAction", current scene is not changed, and message is not modified
  */
  try {
    if (messageId && extra.reply_markup && !newMessage)
      return await ctx.editMessageText(text, extra)
  }
  catch (e) {
    console.error(e)
  }
  const reply = await ctx.replyWithMarkdownV2(text, extra)
  ctx.session.messageId = reply.message_id
}

export async function deleteMessage(ctx: MyContext, message = 'Отменено') {
  await ctx.answerCbQuery(message)
  await ctx.deleteMessage(ctx.session.messageId)
}

export function getState(ctx: MyContext): MySession['state'] {
  return ctx.scene.session.state || {} as MySession['state']
}

export function addPrevScene(ctx: MyContext) {
  const current = ctx.session.current_scene
  const state = getState(ctx)
  if (current)
    state.prevScene ? state.prevScene.push(current) : (state.prevScene = [current])
  return state
}

export function backToPrevScene(ctx: MyContext) {
  const state = getState(ctx)
  const prevScene = state.prevScene ? state.prevScene?.pop() : null

  return { scene: prevScene, state }
}

export function getButtonList<T>(
  items: T[],
  button: (obj: T) => ReturnType<typeof Markup.button.callback>,
) {
  return items.map(item => [button(item)])
}

export type valueOf<T> = T[keyof T]

// export function _getCurrentPage(ctx: MyContext, scene: valueOf<typeof SCENES>) {
//   const state = getState(ctx)
//   const currentScene = ctx.session?.current_scene
//   const currentPage = scene === currentScene ? state?.current_page : 1
//   return currentPage || 1
// }

// function _setPagesLimit(limit: number)

// export function getInfoNavigation(ctx: MyContext, scene: valueOf<typeof SCENES>) {
//   let shouldPrev = false
//   const shouldNext = false
//   const test = () => shouldPrev
//   const currentPage = _getCurrentPage(ctx, scene)
//   // const { limit } = NAVIGATIONS_RULES(scene)
//   const limit = 10
//
//   function getCountPages(countItems: number) {
//     shouldPrev = true
//     const countPages = Math.ceil(countItems / limit)
//   }
//
//   return { currentPage, limit, getCountPages, test }
// }

export class Pagination {
  currentPage: number
  ctx: MyContext
  scene: valueOf<typeof SCENES>
  countItems = 0
  countPages = 1
  shouldNext = false
  shouldPrev = false
  dto: GetCategoryListDto
  default: GetCategoryListDto = {
    offset: 0,
    limit: 10,
    board_id: -1,
    orderBy: 'id',
    order: 'ASC',
  }

  constructor(ctx: MyContext, scene: valueOf<typeof SCENES>, dto?: Partial<GetCategoryListDto>) {
    this.ctx = ctx
    this.scene = scene
    this.dto = {
      ...this.default,
      ...dto,
    }
    this.getCurrentPage()
    this.setOffset()
  }

  private getCurrentPage() {
    const state = getState(this.ctx)
    const currentScene = this.ctx.session?.current_scene
    const currentPage = this.scene === currentScene ? state?.current_page : 1
    state.current_page = currentPage || 1
    this.currentPage = state.current_page
  }

  private setOffset() {
    this.dto.offset = (this.currentPage - 1) * this.dto.limit
  }

  private refreshNavigation() {
    this.shouldPrev = this.currentPage > 1
    this.shouldNext = this.countPages > this.currentPage
  }

  private setCountPages() {
    this.countPages = Math.ceil(this.countItems / this.dto.limit)
    this.refreshNavigation()
  }

  public setCountItems(countItems: number) {
    this.countItems = countItems
    this.setCountPages()
  }
}
