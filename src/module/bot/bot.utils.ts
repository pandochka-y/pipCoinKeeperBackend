import { ExtraEditMessageText } from 'telegraf/typings/telegram-types'
import { Markup } from 'telegraf'

import { CreateUserTelegramDto } from '../users/dto/create-user.dto'

import { MyContext } from './bot.interface'

// import type { Markup } from 'telegraf/typings/markup'

export function createUserDtoFactory(ctx: MyContext): CreateUserTelegramDto {
  return {
    telegram_id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name || null,
  }
}

export async function replyOrEdit(
  ctx: MyContext,
  text: string,
  extra: ExtraEditMessageText,
) {
  const messageId = ctx.update.callback_query?.message.message_id || ctx.session.messageId
  const chatId = ctx.from.id
  if (messageId && extra.reply_markup) {
    return await ctx.telegram.editMessageText(
      chatId,
      messageId,
      undefined,
      text,
      extra,
    )
  }
  const reply = await ctx.replyWithMarkdownV2(text, extra)
  ctx.session.messageId = reply.message_id
}

export function addPrevScene(ctx: MyContext) {
  const current = ctx.session.current_scene
  const state = ctx.scene.session.state
  if (current)
    state.prevScene ? state.prevScene.push(current) : (state.prevScene = [current])

  return state
}

export function backToPrevScene(ctx: MyContext) {
  const state = ctx.scene.session.state
  const prevScene = state.prevScene?.pop()

  return { scene: prevScene, state }
}

export function getListButton<T>(
  items: T[],
  button: (obj: T) => ReturnType<typeof Markup.button.callback>,
) {
  return items.map(item => [button(item)],
  )
}
