import fs from 'fs/promises'
import { bkmvdataSchema } from './schemas/bkmvdataSchema'
import {
  Cell,
  DocumentItem,
  DocumentPayment,
  DocumentRecord,
  Row,
  UniformStructureInput,
} from './types'
import { flattenObj, getNestedValue } from './utils/objs'
import { isString, padByType } from './utils/strings'
import { createRow } from './createRow'

function computedValues<T = unknown>(
  cell: Cell<T>,
  input: UniformStructureInput,
  index: number
): number | string | undefined {
  switch (cell.name) {
    case 'uuid':
      return 123456789101112
    case 'runningNumber':
    case 'totalRecords':
      return index + 1
    default:
      return undefined
  }
}

async function createBKMVDATAHeader(input: UniformStructureInput) {
  const getValue = (cell: Cell) => {
    return (
      computedValues(cell, input, 0) ??
      getNestedValue(input, cell.name) ??
      cell.default
    )
  }

  return createRow(input, bkmvdataSchema.header, getValue, undefined)
}

async function createC100Row(
  input: UniformStructureInput,
  document: DocumentRecord
) {
  const getValue = (cell: Cell<DocumentRecord>) => {
    return (
      computedValues(cell, input, 0) ??
      getNestedValue(document, cell.name) ??
      getNestedValue(input, cell.name) ??
      cell.default
    )
  }

  return createRow<DocumentRecord>(
    input,
    bkmvdataSchema.C100,
    getValue,
    document
  )
}
async function createD110Row(
  input: UniformStructureInput,
  document: DocumentRecord,
  item: DocumentItem
) {
  const getValue = (cell: Cell<DocumentItem>) => {
    return (
      computedValues(cell, input, 0) ??
      getNestedValue(item, cell.name) ??
      getNestedValue(document, cell.name) ??
      getNestedValue(input, cell.name) ??
      cell.default
    )
  }

  return createRow<DocumentItem>(input, bkmvdataSchema.D110, getValue, item)
}
async function createD120Row(
  input: UniformStructureInput,
  document: DocumentRecord,
  item: DocumentPayment
) {
  const getValue = (cell: Cell<DocumentPayment>) => {
    return (
      computedValues(cell, input, 0) ??
      getNestedValue(item, cell.name) ??
      getNestedValue(document, cell.name) ??
      getNestedValue(input, cell.name) ??
      cell.default
    )
  }

  return createRow<DocumentPayment>(input, bkmvdataSchema.D120, getValue, item)
}

export async function createBKMVDATABody(input: UniformStructureInput) {
  let text = ''
  for (const document of input.documents) {
    text += await createC100Row(input, document)

    for (const item of document.items) {
      text += await createD110Row(input, document, item)
    }

    for (const payment of document.payments) {
      text += await createD120Row(input, document, payment)
    }
  }

  return text
}

async function createBKMVDATAFooter(input: UniformStructureInput) {
  const getValue = (cell: Cell) => {
    return (
      computedValues(cell, input, 0) ??
      getNestedValue(input, cell.name) ??
      cell.default
    )
  }

  return createRow(input, bkmvdataSchema.footer, getValue, undefined)
}

export async function createBKMVDATA(
  input: UniformStructureInput,
  path: string = 'BKMVDATA.txt'
) {
  const body = await createBKMVDATABody(input)
  const header = await createBKMVDATAHeader(input)
  const footer = await createBKMVDATAFooter(input)

  let text = header + body + footer

  // trip last new line
  text = text.replace(/\n$/g, '')
  await fs.writeFile(path, text)
  // console.log('File written to', path)

  return text
}
