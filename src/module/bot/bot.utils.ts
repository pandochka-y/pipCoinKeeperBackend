import { ExtraEditMessageText } from 'telegraf/typings/telegram-types'

import { CreateUserTelegramDto } from '../users/dto/create-user.dto'

import { MySceneContext, MyWizardContext } from './bot.interface'

export function createUserDtoFactory(ctx: MySceneContext): CreateUserTelegramDto {
  return {
    telegram_id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name || null,
  }
}

export async function replyOrEdit(
  ctx: MySceneContext | MyWizardContext,
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
  const reply = await ctx.replyWithHTML(text, extra)
  ctx.session.messageId = reply.message_id
}

export function addPrevScene(ctx: MySceneContext, scene: string) {
  const state = ctx.scene.session.state
  state.prevScene ? state.prevScene.push(scene) : (state.prevScene = [scene])
  return state
}

export function backCallback(ctx: MySceneContext, scene: string) {
  const state = ctx.scene.session.state
  const prevScene = state.prevScene?.pop() || scene

  return { scene: prevScene, state }
}
