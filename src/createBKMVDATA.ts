import fs from 'fs/promises'
import { bkmvdataFormat } from './formats/bkmvdataFormat'
import { Cell, UniformStructureInput } from './types'
import { flattenObj } from './utils/objs'
import { iniFormat } from './formats/iniFormat'
import { padByType } from './utils/strings'

function computedValues(
  cell: Cell,
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
  const flatInput = flattenObj(input as any)

  let header = ''
  for (const cell of bkmvdataFormat.header.cells) {
    const value = !!cell.name
      ? computedValues(cell, input, 0) ?? flatInput[cell.name]
      : undefined

    if (value !== undefined) {
      header += padByType(cell.type, value as number | string, cell.length)
    } else if (cell.default) {
      header += padByType(cell.type, cell.default, cell.length)
    }

    // If the all header is less than the endAt position, then neither the value nor the default value is set
    if (header.length < cell.endAt) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function') required = cell.required(input)

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

async function createBKMVDATABody() {}

async function createBKMVDATAFooter(input: UniformStructureInput) {
  const flatInput = flattenObj(input as any)

  let header = ''
  for (const cell of bkmvdataFormat.footer.cells) {
    const value = !!cell.name
      ? computedValues(cell, input, 0) ?? flatInput[cell.name]
      : undefined

    if (value !== undefined) {
      header += padByType(cell.type, value as number | string, cell.length)
    } else if (cell.default) {
      header += padByType(cell.type, cell.default, cell.length)
    }

    // If the all header is less than the endAt position, then neither the value nor the default value is set
    if (header.length < cell.endAt) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function') required = cell.required(input)

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

export async function createBKMVDATA(input: UniformStructureInput) {
  const header = await createBKMVDATAHeader(input)
  const body = await createBKMVDATABody()
  const footer = await createBKMVDATAFooter(input)

  const path = 'BKMVDATA.txt'
  const text = header + body
  await fs.writeFile(path, text)
  // console.log('File written to', path)

  return text
}
