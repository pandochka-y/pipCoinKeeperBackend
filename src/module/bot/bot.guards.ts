import { Markup } from 'telegraf'

import { MyContext } from './bot.interface'
import { BUTTONS } from './bot.constants'
import { replyToMessage } from './bot.utils'

export const OPERATIONS = {
  BOARD_MANAGEMENT: 'board_management',
  PAYMENT_MANAGE: 'payment_management',
  EDIT_CURRENCY: 'edit_currency',
} as const

export enum ROLES {
  ADMIN = 'ADMIN',
  BOARD_USER = 'BOARD_USER',
}

export enum TYPE_ACCESS {
  BOARDS = 'boards',
  BOT = 'bot',
}
export const ACCESS_OPERATIONS = {
  [TYPE_ACCESS.BOARDS]: {
    [ROLES.ADMIN]: Object.values(OPERATIONS),
    [ROLES.BOARD_USER]: [OPERATIONS.PAYMENT_MANAGE, OPERATIONS.EDIT_CURRENCY],
  },
  [TYPE_ACCESS.BOT]: {
    [ROLES.ADMIN]: [],
  },
} as const

export function canActivate(
  role: string,
  action: valueOf<typeof OPERATIONS>,
  type: valueOf<typeof TYPE_ACCESS> = TYPE_ACCESS.BOARDS,
) {
  return !!ACCESS_OPERATIONS[type]?.[role]?.includes(action)
}

export function messageAccessDenied(ctx: MyContext, text: string) {
  const buttons = [BUTTONS.BACK(), BUTTONS.MAIN_MENU]
  const inlineKeyboard = Markup.inlineKeyboard(buttons)
  return replyToMessage(ctx, text, inlineKeyboard)
}

export type valueOf<T> = T[keyof T]
