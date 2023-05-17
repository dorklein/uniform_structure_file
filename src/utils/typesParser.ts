import { Dictionary } from '../types'

export interface TechnicalType {
  type: 'string' | 'number' | 'float' | 'date' | 'time' | 'boolean'
  length: number
  shouldHaveSign?: boolean
  decimalPlaces?: number
}

export const typesParser = (technicalType: string): TechnicalType => {
  const regex = /^(X9|X|9)\((\d+)\)?(\((\d+)\))?(V(\d+))?/gm
  const matches = regex.exec(technicalType)
  if (!matches) throw new Error(`Invalid technical type ${technicalType}`)
  const [, typeChar, length, , , , decimalPlacesStr] = matches

  const decimalPlaces = decimalPlacesStr?.length ?? 0
  const shouldHaveSign = typeChar === 'X9'
  return {
    type: !!decimalPlaces ? 'float' : typesChars[typeChar],
    length: +length + decimalPlaces + (shouldHaveSign ? 1 : 0),
    decimalPlaces: decimalPlaces,
    shouldHaveSign,
  }
}

const typesChars: Dictionary<TechnicalType['type']> = {
  X: 'string',
  '9': 'number',
  X9: 'float',
}
