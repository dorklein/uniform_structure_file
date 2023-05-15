import * as fs from 'fs/promises'
import { iniFormat, UniformStructureInput } from './formats/iniFormat'
import { flattenObj } from './utils/objs'
import { Cell } from './types'
import { dateToHHMM, dateToMMDDhhmm, dateToYYYYMMDD } from './utils/dates'

/**
 * @startuml
 * Bob->Alice : hello
 * @enduml
 */

export async function createBKMVDATA() {
  const path = 'BKMVDATA.txt'
  const text = 'Hello World!'
  await fs.writeFile(path, text)
  console.log('File written to', path)
}

// export function main() {
//     createINI()
//     createBKMVDATA()
// }

// main()
