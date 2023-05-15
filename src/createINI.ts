import { iniFormat } from './formats/iniFormat'
import { dateToHHMM, dateToMMDDhhmm, dateToYYYYMMDD } from './utils/dates'
import { Cell, Dictionary, UniformStructureInput } from './types'
import { flattenObj, getNestedValue, isObject } from './utils/objs'
import fs from 'fs/promises'
import { isString, padByType } from './utils/strings'

function numberOfRowsInBKMVDATA() {
  return 32
}

function dirPath(input: UniformStructureInput) {
  const taxIdWithoutCheckDigit = input.business.taxId.toString().slice(0, 8)
  const shortYear = input.processStartDate.getFullYear().toString().slice(2)
  return `/OPENFRMT/${taxIdWithoutCheckDigit}.${shortYear}/${dateToMMDDhhmm(
    input.processStartDate
  )}`
}

function computedValues(
  cell: Cell,
  input: UniformStructureInput
): number | string | undefined {
  switch (cell.name) {
    case 'uuid':
      // TODO: Implement
      return 123456789101112
    case 'numberOfRowsInBKMVDATA':
      return numberOfRowsInBKMVDATA()
    case 'dirPath':
      return dirPath(input)
    case 'processStartDate':
      return dateToYYYYMMDD(input.processStartDate)
    case 'processStartTime':
      return dateToHHMM(input.processStartDate)
    default:
      return undefined
  }
}

export async function createINIHeader(input: UniformStructureInput) {
  // const flatInput = flattenObj(input as any)

  let header = ''
  for (const cell of iniFormat.header.cells) {
    const value =
      (!!cell.name
        ? computedValues(cell, input) ?? getNestedValue(input, cell.name)
        : undefined) ?? cell.default

    if (value !== undefined) {
      header += padByType(cell.type, value as number | string, cell.length)
    }

    // If the all header is less than the endAt position, then neither the value nor the default value is set
    if (header.length < cell.endAt) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function')
        required = cell.required(input, undefined)

      if (required && !['positive', 'negative'].includes(cell.type)) {
        // is string

        throw new Error(
          isString(required)
            ? required
            : `Required field [${cell.fieldId}]'${cell.name}'  has no default value.`
        )
      }
      header += padByType(cell.type, '', cell.length)
    }
  }

  header += '\n'
  return header
}

const recordCodes = ['B100', 'B110', 'C100', 'D110', 'D120', 'M100']
export async function createINIBody() {
  let body = ''

  for (const recordCode of recordCodes) {
    body += recordCode

    const countCellSchema = iniFormat.summaryRow.cells[1]
    body += padByType(countCellSchema.type, 23, countCellSchema.length)

    body += '\n'
  }

  return body
}

export async function createINI(
  input: UniformStructureInput,
  path: string = 'INI.txt'
) {
  const header = await createINIHeader(input)
  const body = await createINIBody()

  let text = header + body

  // trip last new line
  text = text.slice(0, text.length - 1)
  await fs.writeFile(path, text)
  // console.log('File written to', path)

  return text
}
