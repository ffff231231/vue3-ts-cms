import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(utcString: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(utcString).local().format(format)
}
