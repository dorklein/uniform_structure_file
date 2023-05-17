import { describe, test, expect } from '@jest/globals'
import { Dictionary } from '../../../src/types'
import { TechnicalType, typesParser } from '../../../src/utils/typesParser'

describe('typesParser', () => {
  test('X(n)', () => {
    const typesMap: Dictionary<TechnicalType> = {
      'X(1)': {
        type: 'string',
        length: 1,
      },
      'X(5)': {
        type: 'string',
        length: 5,
      },
    }

    for (const [key, value] of Object.entries(typesMap)) {
      const result = typesParser(key)
      expect(result.length).toBe(value.length)
      expect(result.type).toBe(value.type)
    }
  })

  test('9(n)', () => {
    const typesMap: Dictionary<TechnicalType> = {
      '9(1)': {
        type: 'number',
        length: 1,
      },
      '9(6)': {
        type: 'number',
        length: 6,
      },
    }

    for (const [key, value] of Object.entries(typesMap)) {
      const result = typesParser(key)
      expect(result.length).toBe(value.length)
      expect(result.type).toBe(value.type)
    }
  })

  test('X9(n)V99', () => {
    const typesMap: Dictionary<TechnicalType> = {
      'X9(2)V99': {
        type: 'float',
        length: 5,
        decimalPlaces: 2,
        shouldHaveSign: true,
      },
      'X9(5)V99': {
        type: 'float',
        length: 8,
        decimalPlaces: 2,
        shouldHaveSign: true,
      },
    }

    for (const [key, value] of Object.entries(typesMap)) {
      const result = typesParser(key)
      expect(result.length).toBe(value.length)
      expect(result.type).toBe(value.type)
      expect(result.decimalPlaces).toBe(value.decimalPlaces)
      expect(result.shouldHaveSign).toBe(value.shouldHaveSign)
    }
  })

  test('9(n)V99', () => {
    const typesMap: Dictionary<TechnicalType> = {
      '9(3)V9': {
        type: 'float',
        length: 4,
        decimalPlaces: 1,
        shouldHaveSign: false,
      },
      '9(12)V99': {
        type: 'float',
        length: 14,
        decimalPlaces: 2,
        shouldHaveSign: false,
      },
    }

    for (const [key, value] of Object.entries(typesMap)) {
      const result = typesParser(key)
      expect(result.length).toBe(value.length)
      expect(result.type).toBe(value.type)
      expect(result.decimalPlaces).toBe(value.decimalPlaces)
      expect(result.shouldHaveSign).toBe(value.shouldHaveSign)
    }
  })
})
