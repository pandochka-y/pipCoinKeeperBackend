import { ExtraEditMessageText } from 'telegraf/typings/telegram-types'
import { Markup } from 'telegraf'

import { CreateUserTelegramDto } from '../users/dto/create-user.dto'

import { MyContext } from './bot.interface'

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
) {
  const messageId = ctx.update.callback_query?.message.message_id || ctx.session.messageId
  /*
  * to fix the application crash on error 400: Bad Request: message is not modified,
  * when a scene is called from an old message
  * if on action "onBackAction", current scene is not changed, and message is not modified
  */
  try {
    if (messageId && extra.reply_markup)
      return await ctx.editMessageText(text, extra)
  }
  catch (e) {
    console.error(e)
  }
  const reply = await ctx.replyWithMarkdownV2(text, extra)
  ctx.session.messageId = reply.message_id
}

export function getState(ctx: MyContext) {
  return ctx.scene.session.state || {}
}

export function addPrevScene(ctx: MyContext) {
  const current = ctx.session.current_scene
  const state = getState(ctx)
  if (current)
    state.prevScene ? state.prevScene.push(current) : (state.prevScene = [current])
  return state
}

export function backToPrevScene(ctx: MyContext) {
  // FIXME: double check current scene from old message
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
