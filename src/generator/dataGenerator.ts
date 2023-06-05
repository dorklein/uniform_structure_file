import {BaseGenerator} from './baseGenerator'
import {
    AccountingAccount,
    AccountingActions,
    BKMVDATARowsCount,
    Cell,
    DocumentItem,
    DocumentPayment,
    DocumentRecord,
    DocumentType, InventoryItem,
    UniformStructureInput,
} from '../types'
import {getNestedValue} from '../utils/objs'
import {bkmvdataSchema} from '../schemas/bkmvdataSchema'
import {expectedDATALineLength} from '../utils/constants'

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

    private createD110Row(document: DocumentRecord, item: DocumentItem, index: number): void {
        const getValue = (cell: Cell<DocumentItem>) => {
            if (cell.name === 'lineNumber') {
                return index + 1
            }

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

    private createD120Row(document: DocumentRecord, item: DocumentPayment, index: number): void {
        const getValue = (cell: Cell<DocumentPayment>) => {
            if (cell.name === 'lineNumber') {
                return index + 1
            }

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

    private createB100Row(item: AccountingActions): void {
      const getValue = (cell: Cell<AccountingActions>) => {
        return (
          this.computedValues(cell) ??
          getNestedValue(item, cell.name) ??
          getNestedValue(this.input, cell.name) ??
          cell.default
        )
      }

      this.createRow<AccountingActions>(bkmvdataSchema.B100, getValue, item)
    }

    private createB110Row(item: AccountingAccount): void {
      const getValue = (cell: Cell<AccountingAccount>) => {
        return (
          this.computedValues(cell) ??
          getNestedValue(item, cell.name) ??
          getNestedValue(this.input, cell.name) ??
          cell.default
        )
      }

      this.createRow<AccountingAccount>(bkmvdataSchema.B110, getValue, item)
    }

    private createM100Row(item: InventoryItem): void {
      const getValue = (cell: Cell<InventoryItem>) => {
        return (
          this.computedValues(cell) ??
          getNestedValue(item, cell.name) ??
          getNestedValue(this.input, cell.name) ??
          cell.default
        )
      }

      this.createRow<InventoryItem>(bkmvdataSchema.M100, getValue, item)
    }

    private createBKMVDATABody(): void {
        for (const action of this.input.accountingActions) {
            this.createB100Row(action)
        }
        for (const account of this.input.accountingAccounts) {
            this.createB110Row(account)
        }

        for (const document of this.input.documents) {
            this.createC100Row(document)

            // Don't create item rows for receipts
            if (![DocumentType.RECEIPT, DocumentType.DONATION_RECEIPT].includes(document.documentType)) {
                document.items.forEach((item, index) => {
                    this.createD110Row(document, item, index)
                })
            }
            document.payments.forEach((payment, index) => {
                this.createD120Row(document, payment, index)
            })
        }

        for (const item of this.input.inventoryItems) {
            this.createM100Row(item)
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
