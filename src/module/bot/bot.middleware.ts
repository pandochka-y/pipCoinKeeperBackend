import { session } from 'telegraf'

// https://github.com/telegraf/session#postgresql
import { Postgres } from '@telegraf/session/pg'

import { MyContext } from './bot.interface'

interface poolOpt {
  host?: string | undefined
  port?: number | undefined
  database?: string | undefined
  user?: string | undefined
  password?: string | (() => string | Promise<string>) | undefined
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
