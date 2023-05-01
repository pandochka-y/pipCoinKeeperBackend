import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function getPeriodDate(query_from?: string, query_to?: string) {
  const to = dayjs(query_to).utc().toDate()
  const from = query_from ? dayjs(query_from).utc().toDate() : dayjs().utc().startOf('month').toDate()
  return { to, from }
}
