import { BaseGenerator } from './baseGenerator'
import {
  BKMVDATARowsCount,
  Cell,
  Dictionary,
  UniformStructureInput,
} from '../types'
import { getNestedValue } from '../utils/objs'
import { createRow } from '../createRow'
import { iniSchema } from '../schemas/iniSchema'
import { padByType } from '../utils/strings'
import { dateToHHMM, dateToMMDDhhmm, dateToYYYYMMDD } from '../utils/dates'
import * as path from 'path'

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

  protected validateBeforeSave(): void {}

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
