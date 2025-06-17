import { parse, format, isValid } from 'date-fns'

/**
 * 文字列から日付部分（YYYY-MM-DD）だけを抽出して返す（unknown対応）
 * @param dateTimeStr 例: '2022-12-21 23:42:00' または null/undefined/unknown
 * @returns '2022-12-21' 失敗時は空文字
 */
export function extractDate(dateTimeStr: unknown): string {
  if (typeof dateTimeStr !== 'string' || !dateTimeStr) return ''
  const date = parse(dateTimeStr, 'yyyy-MM-dd HH:mm:ss', new Date())
  if (!isValid(date)) return ''
  return format(date, 'yyyy-MM-dd')
}
