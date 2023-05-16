import { iniSchema } from './schemas/iniSchema'
import { dateToHHMM, dateToMMDDhhmm, dateToYYYYMMDD } from './utils/dates'
import { Cell, Dictionary, UniformStructureInput } from './types'
import { flattenObj, getNestedValue, isObject } from './utils/objs'
import fs from 'fs/promises'
import { isString, padByType } from './utils/strings'
import { createRow } from './createRow'
import { bkmvdataSchema } from './schemas/bkmvdataSchema'

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
  const getValue = (cell: Cell) => {
    return (
      computedValues(cell, input) ??
      getNestedValue(input, cell.name) ??
      cell.default
    )
  }

  return createRow(input, iniSchema.header, getValue, undefined)
}

const recordCodes = ['B100', 'B110', 'C100', 'D110', 'D120', 'M100']
export async function createINIBody() {
  let body = ''

  for (const recordCode of recordCodes) {
    body += recordCode

    const countCellSchema = iniSchema.summaryRow.cells[1]
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
