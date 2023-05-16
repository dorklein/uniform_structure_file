import { BaseGenerator } from './baseGenerator'
import { BKMVDATARowsCount, Cell, UniformStructureInput } from '../types'
import { getNestedValue } from '../utils/objs'
import { iniSchema } from '../schemas/iniSchema'
import { padByType } from '../utils/strings'
import * as path from 'path'
import { expectedINILineLength } from '../utils/constants'

export class IniGenerator extends BaseGenerator {
  #BKMVDATARowsCount: BKMVDATARowsCount

  constructor(
    input: UniformStructureInput,
    uuid: string,
    filePath: string,
    dataRowsCount: BKMVDATARowsCount
  ) {
    super(input, uuid, filePath)

    this.#BKMVDATARowsCount = dataRowsCount // Should be set before customComputedValues fields
    this.customComputedValues['numberOfRowsInBKMVDATA'] =
      this.countAllBKMVDATARows()
    this.customComputedValues['dirPath'] = path.parse(filePath).dir
  }

  private countAllBKMVDATARows(): number {
    return (
      Object.values(this.#BKMVDATARowsCount).reduce(
        (partialSum, a) => partialSum + a,
        0
      ) + 2
    )
  }

  private validateHeader(): void {
    // recordCode
    const recordCode = 'A000'
    const line = this.lines[0]
    if (!line.startsWith(recordCode)) {
      throw new Error(`INI.txt first line should start with ${recordCode}`)
    }
  }

  private validateLength(): void {
    for (const line of this.lines) {
      const recordCode = line.substring(0, 4)
      const actualLength = line.length

      const expectedLength = expectedINILineLength[recordCode]
      if (actualLength !== expectedLength) {
        throw new Error(
          `INI.txt ${recordCode} line length should be ${expectedLength}. Actual ${line.length}`
        )
      }
    }
  }

  protected validateBeforeSave(): void {
    // Validate header
    this.validateHeader()

    // Validate line length
    this.validateLength()
  }

  createINIHeader(): void {
    const getValue = (cell: Cell) => {
      return (
        this.computedValues(cell) ??
        getNestedValue(this.input, cell.name) ??
        cell.default
      )
    }

    this.createRow(iniSchema.header, getValue, undefined)
  }

  createINIBody(): void {
    for (const [recordCode, sum] of Object.entries<number>(
      this.#BKMVDATARowsCount
    )) {
      let line = recordCode

      const countCellSchema = iniSchema.summaryRow.cells[1]
      line += padByType(countCellSchema.type, sum, countCellSchema.length)

      this.lines.push(line)
    }
  }

  protected create() {
    this.createINIHeader()
    this.createINIBody()
  }
}
