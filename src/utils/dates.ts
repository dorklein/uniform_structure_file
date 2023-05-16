/**
 * Is date obj
 */
export function isDate(obj: unknown): obj is Date {
  return obj instanceof Date
}

/**
 * Convert a date to a number as YYYYMMDD
 * @param date
 */
export function dateToYYYYMMDD(date: Date): string {
  const dateFormatter = new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const [] = dateFormatter.formatToParts()
  const strDate = `${date.getFullYear()}${date.getMonth()}${date.getDay()}`
  console.log(strDate, date)

  return strDate
}

/**
 * Convert a date to a number as HHMM
 * @param date
 */
export function dateToHHMM(date: Date): string {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const strDate = dateFormatter.format(date)

  return strDate.replace(/:/g, '')
}

/**
 * Convert a date to a number as MMDDhhmm
 * @param date
 */
export function dateToMMDDhhmm(date: Date): string {
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const strDate = dateFormatter.format(date)

  return strDate.replace(/[\/:, ]/g, '')
}
