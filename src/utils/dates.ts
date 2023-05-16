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
  // we need to use the parts to get the correct date
  const parts = dateFormatter.formatToParts(date)
  return `${parts[4].value}${parts[2].value}${parts[0].value}`
}

/**
 * Convert a date to a number as HHMM
 * @param date
 */
export function dateToHHMM(date: Date): string {
  const dateFormatter = new Intl.DateTimeFormat('he-IL', {
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
