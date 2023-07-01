import { session } from 'telegraf'

// TODO: connect pg https://github.com/telegraf/session#postgresql
export const botMiddleware = session()
export async function botMiddlewareResponseTime(ctx, next) {
  const start = new Date().getTime()
  await next()
  const ms = new Date().getTime() - start
  console.log('Response time: %sms', ms)
}
