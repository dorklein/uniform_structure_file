import fs from 'fs/promises'
import { bkmvdataFormat } from './formats/bkmvdataFormat'
import {
  Cell,
  DocumentItem,
  DocumentPayment,
  DocumentRecord,
  UniformStructureInput,
} from './types'
import { flattenObj, getNestedValue } from './utils/objs'
import { isString, padByType } from './utils/strings'

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
  // const flatInput = flattenObj(input as any)
  // console.log(flatInput)
  // return flatInput
  //
  let header = ''
  for (const cell of bkmvdataFormat.header.cells) {
    const value =
      (!!cell.name
        ? computedValues(cell, input, 0) ?? getNestedValue(input, cell.name)
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

      if (required) {
        throw new Error(
          `Required field '${cell.name}' (${cell.description}) has no default value`
        )
      }
      header += padByType(cell.type, '', cell.length)
    }
  }

  header += '\n'
  return header
}

async function createC100Row(
  input: UniformStructureInput,
  document: DocumentRecord
) {
  let text = ''
  for (const cell of bkmvdataFormat.C100Row.cells) {
    const value =
      (!!cell.name
        ? computedValues(cell, input, 0) ??
          getNestedValue(document, cell.name) ??
          getNestedValue(input, cell.name)
        : undefined) ?? cell.default

    if (value !== undefined) {
      text += padByType(cell.type, value as number | string | Date, cell.length)
    }

    // If the all header is less than the endAt position, then neither the value nor the default value is set
    if (text.length < cell.endAt) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function')
        required = cell.required(input, document)

      if (required && !['positive', 'negative'].includes(cell.type)) {
        throw new Error(
          `Required field [${cell.fieldId}]'${cell.name}'  has no default value.`
        )
      }
      text += padByType(cell.type, '', cell.length)
    }
  }

  text += '\n'
  return text
}
async function createD110Row(
  input: UniformStructureInput,
  document: DocumentRecord,
  item: DocumentItem
) {
  let text = ''
  for (const cell of bkmvdataFormat.D110Row.cells) {
    const value =
      (!!cell.name
        ? computedValues(cell, input, 0) ??
          getNestedValue(item, cell.name) ??
          getNestedValue(document, cell.name) ??
          getNestedValue(input, cell.name)
        : undefined) ?? cell.default

    if (value !== undefined) {
      text += padByType(cell.type, value as number | string | Date, cell.length)
    }

    // If the all header is less than the endAt position, then neither the value nor the default value is set
    if (text.length < cell.endAt) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function')
        required = cell.required(input, item)

      if (required && !['positive', 'negative'].includes(cell.type)) {
        throw new Error(
          `Required field [${cell.fieldId}]'${cell.name}'  has no default value.`
        )
      }
      text += padByType(cell.type, '', cell.length)
    }
  }

  text += '\n'
  return text
}
async function createD120Row(
  input: UniformStructureInput,
  document: DocumentRecord,
  item: DocumentPayment
) {
  let text = ''
  for (const cell of bkmvdataFormat.D120Row.cells) {
    const value =
      (!!cell.name
        ? computedValues(cell, input, 0) ??
          getNestedValue(item, cell.name) ??
          getNestedValue(document, cell.name) ??
          getNestedValue(input, cell.name)
        : undefined) ?? cell.default

    if (value !== undefined) {
      text += padByType(cell.type, value as number | string | Date, cell.length)
    }

    // If the all header is less than the endAt position, then neither the value nor the default value is set
    if (text.length < cell.endAt) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function')
        required = cell.required(input, item)

      if (required && !['positive', 'negative'].includes(cell.type)) {
        // is string

        throw new Error(
          isString(required)
            ? required
            : `Required field [${cell.fieldId}]'${cell.name}'  has no default value.`
        )
      }
      text += padByType(cell.type, '', cell.length)
    }
  }

  text += '\n'
  return text
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

  // text += '\n'
  return text
}

async function createBKMVDATAFooter(input: UniformStructureInput) {
  const flatInput = flattenObj(input as any)

  let text = ''
  for (const cell of bkmvdataFormat.footer.cells) {
    const value =
      (!!cell.name
        ? computedValues(cell, input, 0) ?? flatInput[cell.name]
        : undefined) ?? cell.default

    if (value !== undefined) {
      text += padByType(cell.type, value as number | string, cell.length)
    }

    // If the all text is less than the endAt position, then neither the value nor the default value is set
    if (text.length < cell.endAt) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function')
        required = cell.required(input, undefined)

      if (required) {
        throw new Error(
          `Required field '${cell.name}' (${cell.description}) has no default value`
        )
      }
      text += padByType(cell.type, '', cell.length)
    }
  }

  text += '\n'
  return text
}

export async function createBKMVDATA(
  input: UniformStructureInput,
  path: string = 'BKMVDATA.txt'
) {
  const header = await createBKMVDATAHeader(input)
  const body = await createBKMVDATABody(input)
  const footer = await createBKMVDATAFooter(input)

  let text = header + body + footer

  // trip last new line
  text = text.replace(/\n$/g, '')
  await fs.writeFile(path, text)
  // console.log('File written to', path)

  return text
}
