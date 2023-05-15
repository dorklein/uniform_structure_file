import { describe, test, expect } from '@jest/globals'
import * as fs from 'fs/promises'

const expectedLineLength = {
  'INI.TXT': {
    A000: 466,
    B100: 19,
    B110: 19,
    C100: 19,
    D110: 19,
    D120: 19,
    M100: 19,
  },
  'BKMVDATA.TXT': {
    A100: 95,
    B100: 317,
    B110: 376,
    C100: 444,
    D110: 339,
    D120: 222,
    M100: 298,
    Z900: 110,
  },
}

describe('Line length', () => {
  test('INI.TXT', async () => {
    const filePath = 'tests/INI.txt'
    // Generate the file

    // Read the file
    const data = await fs.readFile(filePath, 'utf8')
    const lines = data.split('\n')

    const expectedLength = expectedLineLength['INI.TXT']
    for (const line of lines) {
      const recordCode = line.substring(0, 4)
      const actualLength = line.length
      expect(expectedLength[recordCode]).toBe(actualLength)
    }
  })

  test('BKMVDATA.TXT', async () => {
    const filePath = 'tests/BKMVDATA.txt'
    // Generate the file

    // Read the file
    const data = await fs.readFile(filePath, 'utf8')
    const lines = data.split('\n')

    const expectedLength = expectedLineLength['BKMVDATA.TXT']
    for (const line of lines) {
      const recordCode = line.substring(0, 4)
      const actualLength = line.length
      expect(expectedLength[recordCode]).toBe(actualLength)
    }
  })
})
