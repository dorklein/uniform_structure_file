import { isDate } from 'util/types'
import { ssnValidator } from './ssnValidator'
import { isString } from './strings'
import cc from 'currency-codes'

type ValidatorValue = string | number | Date | undefined

export function isValidDate(value: ValidatorValue) {
  if (!value) return `Date ${value} is invalid`
  if (!isDate(value)) return `Date ${value} is invalid`

  const today = new Date()

  return value.getTime() <= today.getTime() || `Date ${value} is in the future`
}

export function isOptionalValidDate(value: ValidatorValue) {
  if (!value) return true // not required
  return isValidDate(value)
}

export function isValidSSN(value: ValidatorValue) {
  if (!value) return `SSN ${value} is invalid`
  if (isDate(value)) return `SSN ${value} is invalid`

  return ssnValidator(value) || `SSN ${value} check digit is invalid`
}

export function isValidCurrencyCode(value: ValidatorValue) {
  if (!isString(value)) return `Currency code ${value} is invalid`

  return !!cc.code('EUR') || `Currency code ${value} is invalid`
}
export function isOptionalValidCurrencyCode(value: ValidatorValue) {
  if (!value) return true // not required
  return isValidCurrencyCode(value)
}
