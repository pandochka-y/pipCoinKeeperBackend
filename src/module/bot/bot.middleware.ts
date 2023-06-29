import { session } from 'telegraf'

// TODO: connect pg https://github.com/telegraf/session#postgresql
export const botMiddleware = session()
