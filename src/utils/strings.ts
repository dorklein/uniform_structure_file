import { CellType } from '../types'
import { dateToHHMM, dateToYYYYMMDD, isDate } from './dates'

/**
 * Is string guard
 */
export function isString(obj: unknown): obj is string {
  return typeof obj === 'string' || obj instanceof String
}

export const emptyByLength = (length: number): string =>
  Array(length).fill(' ').join('')
export const padNumbers = (number: number, length: number): string => {
  const str = number.toString()
  return (
    Array(length - str.length)
      .fill('0')
      .join('') + str
  )
}

export const padString = (str: string, length: number): string => {
  return str + emptyByLength(length - str.length)
}

function padEmptyByType(type: CellType, length: number) {
  switch (type) {
    case 'date':
    case 'time':
    case 'number':
      return padNumbers(0, length)
    case 'string':
      return padString('', length)
    case 'boolean':
      return '0'
    case 'positive':
      return `+${padNumbers(0, length - 1)}`
    case 'negative':
      return `-${padNumbers(0, length - 1)}`
    default:
      throw new Error(`Invalid type ${type}`)
  }
}
export const padByType = (
  type: CellType,
  value: string | number | Date | null,
  length: number
): string => {
  if (value === null) {
    return padEmptyByType(type, length)
  }

  switch (type) {
    case 'date':
      if (!isDate(value)) throw new Error(`Invalid date value ${value}`)
      return dateToYYYYMMDD(value)
    case 'time':
      if (!isDate(value)) throw new Error(`Invalid time value ${value}`)
      return dateToHHMM(value)
    case 'string':
      return padString(value as string, length)
    case 'number':
      return padNumbers(value as number, length)
    case 'boolean':
      value = parseInt(`${value}`)
      if (value !== 1 && value !== 0) value = 0
      return padString(`${value}`, length)
    case 'positive':
      return `+${padNumbers(value as number, length - 1)}`
    case 'negative':
      return `-${padNumbers(value as number, length - 1)}`
    default:
      throw new Error(`Invalid type ${type}`)
  }
}
