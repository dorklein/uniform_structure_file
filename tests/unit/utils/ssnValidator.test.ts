import { describe, test, expect } from '@jest/globals'
import { getCheckDigit, ssnValidator } from '../../src/utils/ssnValidator'

describe('ssnValidator', () => {
  test('should pad start with 0 when shorter than 9', () => {
    const ssn = 43700426

    const result = ssnValidator(ssn)

    expect(result).toBe(true)
  })
  test('should return true for valid ssn', () => {
    const ssn = 543700421

    const result = ssnValidator(ssn)

    expect(result).toBe(true)
  })
  test('should return true for valid ssn', () => {
    const ssn = 543700421

    const result = ssnValidator(ssn)

    expect(result).toBe(true)
  })
  test('should return false for invalid ssn', () => {
    const ssn = 543700420

    const result = ssnValidator(ssn)

    expect(result).toBe(false)
  })
  test('should accept string value', () => {
    const ssn = 543700421

    const result = ssnValidator(ssn.toString())

    expect(result).toBe(true)
  })
  test('should accept number value', () => {
    const ssn = 543700421

    const result = ssnValidator(ssn)

    expect(result).toBe(true)
  })
})

describe('getCheckDigit', () => {
  test('should pad start with 0 when shorter than 8', () => {
    const ssn = 4370042
    const expectedCheckDigit = 6

    const result = getCheckDigit(ssn)

    expect(result).toBe(expectedCheckDigit)
  })
  test('should return check digit for valid ssn', () => {
    const ssn = '54370042'
    const expectedCheckDigit = 1

    const result = getCheckDigit(ssn)

    expect(result).toBe(expectedCheckDigit)
  })
})
