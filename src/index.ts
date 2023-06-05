import { dateToMMDDhhmm } from './utils/dates'
import { IniGenerator } from './generator/iniGenerator'
import { DataGenerator } from './generator/dataGenerator'
import { customAlphabet } from 'nanoid'
import * as path from 'path'
import * as fs from 'fs/promises'
import { UniformStructureInput } from './types'
import { zip } from 'zip-a-folder'

function getDirPath(input: UniformStructureInput): string {
  const taxIdWithoutCheckDigit = input.business.taxId.toString().slice(0, 8)
  const shortYear = input.processStartDate.getFullYear().toString().slice(2)
  return `OPENFRMT/${taxIdWithoutCheckDigit}.${shortYear}/${dateToMMDDhhmm(
    input.processStartDate
  )}`
}

export async function generateUSF(input: UniformStructureInput) {
  const nanoid = customAlphabet('123456789', 15)
  const uuid = nanoid()

  const dirPath = getDirPath(input)
  const iniFilePath = path.join(dirPath, 'INI.txt')
  const dataFilePath = path.join(dirPath, 'BKMVDATA.txt')

  const dataGenerator = new DataGenerator(input, uuid, dataFilePath)
  await dataGenerator.saveToFile()

  const iniGenerator = new IniGenerator(
    input,
    uuid,
    iniFilePath,
    dataGenerator.countRowsByType()
  )
  await iniGenerator.saveToFile()

  // zip
  await zip('OPENFRMT', `OPENFRMT.zip`)

  // Delete the folder
  await fs.rm('OPENFRMT', { recursive: true, force: true})
}

// main()
