// https://github.com/telegraf/session#postgresql
import { Postgres } from '@telegraf/session/pg'
import { session } from 'telegraf'
import { Config, I18n } from '@esindger/telegraf-i18n'

import { MyContext } from './bot.interface'

interface poolOpt {
  host?: string | undefined
  port?: number | undefined
  database?: string | undefined
  user?: string | undefined
  password?: string | (() => string | Promise<string>) | undefined
}

export function botMiddlewareI18n(config: Config) {
  const i18n = new I18n<MyContext>(config)
  return i18n
}

export function botMiddleware(opts: poolOpt) {
  const store = Postgres<MyContext>(opts)
  return session({ store })
}
export async function botMiddlewareResponseTime(ctx, next) {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log('Response time: %sms', ms)
}
