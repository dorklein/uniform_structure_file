import { BaseGenerator } from './baseGenerator'
import {
  BKMVDATARowsCount,
  Cell,
  DocumentItem,
  DocumentPayment,
  DocumentRecord,
  UniformStructureInput,
} from '../types'
import { getNestedValue } from '../utils/objs'
import { bkmvdataSchema } from '../schemas/bkmvdataSchema'
import { expectedDATALineLength } from '../utils/constants'

export class DataGenerator extends BaseGenerator {
  constructor(input: UniformStructureInput, uuid: string, filePath: string) {
    super(input, uuid, filePath)
  }

  protected validateHeader() {
    // recordCode
    const recordCode = 'A100'
    const line = this.lines[0]
    if (!line.startsWith(recordCode)) {
      throw new Error(`BKMVDATA.txt first line should start with ${recordCode}`)
    }
  }

  protected validateFooter() {
    // recordCode
    const recordCode = 'Z900'
    const line = this.lines[this.lines.length - 1]
    if (!line.startsWith(recordCode)) {
      throw new Error(`BKMVDATA.txt last line should start with ${recordCode}`)
    }

    // Has the right total records number
    const expectedTotalRows = this.lines.length
    const totalRows = parseInt(line.slice(46, 60))
    if (totalRows !== expectedTotalRows) {
      throw new Error(
        `BKMVDATA.txt last line doesn't have the valid total records. Expected ${expectedTotalRows}, actual ${totalRows}`
      )
    }
  }

  private validateLength(): void {
    for (const line of this.lines) {
      const recordCode = line.substring(0, 4)
      const actualLength = line.length

      const expectedLength = expectedDATALineLength[recordCode]
      if (actualLength !== expectedLength) {
        throw new Error(
          `BKMVDATA.txt ${recordCode} line length should be ${expectedLength}. Actual ${line.length}`
        )
      }
    }
  }
  private validateRunningNumbers(): void {
    const existingNumbers = new Set<number>()

    for (const line of this.lines) {
      const runningNumber = parseInt(line.slice(5, 13))
      if (existingNumbers.has(runningNumber)) {
        throw new Error(
          `BKMVDATA.txt has more than one '${existingNumbers}' running number`
        )
      }

      existingNumbers.add(runningNumber)
    }

    // All numbers must be sequential
    if (existingNumbers.size !== this.lines.length) {
      throw new Error(`BKMVDATA.txt has skipped some running numbers`)
    }
  }

  protected validateBeforeSave(): void {
    // Validate first is header
    this.validateHeader()

    // Validate last is footer
    this.validateFooter()

    // Validate line length
    this.validateLength()

    // Validate running numbers
    this.validateRunningNumbers()
  }

  public countRowsByType(): BKMVDATARowsCount {
    // This should be called only after all rows were created
    this.validateFooter()

    return {
      C100: this.lines.filter((value) => value.startsWith('C100')).length,
      D110: this.lines.filter((value) => value.startsWith('D110')).length,
      D120: this.lines.filter((value) => value.startsWith('D120')).length,
      B100: this.lines.filter((value) => value.startsWith('B100')).length,
      B110: this.lines.filter((value) => value.startsWith('B110')).length,
      M100: this.lines.filter((value) => value.startsWith('M100')).length,
    }
  }

  private createBKMVDATAHeader(): void {
    const getValue = (cell: Cell) => {
      return (
        this.computedValues(cell) ??
        getNestedValue(this.input, cell.name) ??
        cell.default
      )
    }

    this.createRow(bkmvdataSchema.header, getValue, undefined)
  }

  private createC100Row(document: DocumentRecord): void {
    const getValue = (cell: Cell<DocumentRecord>) => {
      return (
        this.computedValues(cell) ??
        getNestedValue(document, cell.name) ??
        getNestedValue(this.input, cell.name) ??
        cell.default
      )
    }

    this.createRow<DocumentRecord>(bkmvdataSchema.C100, getValue, document)
  }

  private createD110Row(document: DocumentRecord, item: DocumentItem): void {
    const getValue = (cell: Cell<DocumentItem>) => {
      return (
        this.computedValues(cell) ??
        getNestedValue(item, cell.name) ??
        getNestedValue(document, cell.name) ??
        getNestedValue(this.input, cell.name) ??
        cell.default
      )
    }

    this.createRow<DocumentItem>(bkmvdataSchema.D110, getValue, item)
  }

  private createD120Row(document: DocumentRecord, item: DocumentPayment): void {
    const getValue = (cell: Cell<DocumentPayment>) => {
      return (
        this.computedValues(cell) ??
        getNestedValue(item, cell.name) ??
        getNestedValue(document, cell.name) ??
        getNestedValue(this.input, cell.name) ??
        cell.default
      )
    }

    this.createRow<DocumentPayment>(bkmvdataSchema.D120, getValue, item)
  }

  // private createB100Row(document: DocumentRecord, item: DocumentPayment): void {
  //   const getValue = (cell: Cell<DocumentPayment>) => {
  //     return (
  //       this.computedValues(cell) ??
  //       getNestedValue(item, cell.name) ??
  //       getNestedValue(document, cell.name) ??
  //       getNestedValue(this.input, cell.name) ??
  //       cell.default
  //     )
  //   }
  //
  //   this.createRow<DocumentPayment>(bkmvdataSchema.B100, getValue, item)
  // }
  //
  // private createB110Row(document: DocumentRecord, item: DocumentPayment): void {
  //   const getValue = (cell: Cell<DocumentPayment>) => {
  //     return (
  //       this.computedValues(cell) ??
  //       getNestedValue(item, cell.name) ??
  //       getNestedValue(document, cell.name) ??
  //       getNestedValue(this.input, cell.name) ??
  //       cell.default
  //     )
  //   }
  //
  //   this.createRow<DocumentPayment>(bkmvdataSchema.B110, getValue, item)
  // }

  private createBKMVDATABody(): void {
    for (const document of this.input.documents) {
      this.createC100Row(document)

      for (const item of document.items) {
        this.createD110Row(document, item)
      }

      for (const payment of document.payments) {
        this.createD120Row(document, payment)
      }
    }
  }

  private createBKMVDATAFooter() {
    const getValue = (cell: Cell) => {
      return (
        this.computedValues(cell) ??
        getNestedValue(this.input, cell.name) ??
        cell.default
      )
    }

    this.createRow(bkmvdataSchema.footer, getValue, undefined)
  }

  protected create() {
    this.createBKMVDATAHeader()
    this.createBKMVDATABody()
    this.createBKMVDATAFooter()
  }
}
