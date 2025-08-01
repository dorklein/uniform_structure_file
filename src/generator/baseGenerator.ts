import {
  Cell,
  Dictionary,
  FileEncoding,
  Row,
  UniformStructureInput,
} from '../types'
import { isString, padByType } from '../utils/strings'
import fs from 'fs/promises'
import * as path from 'path'
import iconv from 'iconv-lite'

export abstract class BaseGenerator {
  #input: UniformStructureInput
  #uuid: string
  #filePath: string
  #text: string
  #lines: string[]
  static readonly NEW_LINE = '\n'
  protected customComputedValues: Dictionary<number | string> = {}

  protected constructor(
    input: UniformStructureInput,
    uuid: string,
    filePath: string
  ) {
    this.#input = input
    this.#uuid = uuid
    this.#filePath = filePath
    this.#lines = []
    this.#text = ''
  }

  protected get input(): UniformStructureInput {
    return this.#input
  }

  protected get uuid(): string {
    return this.#uuid
  }
  protected get lines(): string[] {
    return this.#lines
  }
  protected get runningNumber(): number {
    return this.#lines.length + 1
  }

  protected computedValues<T = unknown>(
    cell: Cell<T>
  ): number | string | undefined {
    switch (cell.name) {
      case 'uuid':
        return +this.uuid
      case 'runningNumber':
      case 'totalRecords':
        return this.runningNumber
      default:
        if (cell.name in this.customComputedValues) {
          return this.customComputedValues[cell.name]
        }
        return undefined
    }
  }

  protected abstract create(): void
  protected abstract validateBeforeSave(): void

  protected createRow<T = undefined>(
    rowSchema: Row<T>,
    getValue: (cell: Cell<T>) => string | number | Date | undefined,
    item: T
  ): void {
    let text = ''

    for (const cell of rowSchema.cells) {
      let cellText = ''
      const value = getValue(cell)

      // validate value
      if (cell.validator !== undefined) {
        const valid = cell.validator(value, item)
        if (!valid || isString(valid)) {
          throw new Error(
            `Invalid value for [${cell.fieldId}:${cell.name}] ${
              isString(valid) ? valid : ''
            }`
          )
        }
      }

      if (value === undefined) {
        // Check if required is a function
        let required = cell.required
        if (typeof cell.required === 'function')
          required = cell.required(this.input, item)

        // Positive or Negative types have auto default value, even when required.
        if (required && !['positive', 'negative'].includes(cell.type)) {
          throw new Error(
            isString(required)
              ? required
              : `Required field [${cell.fieldId}]'${cell.name}' has no default value`
          )
        }

        cellText = padByType(cell.type, null, cell.length)
      } else {
        // Check if the value given isn't longer than the supported length
        if (
          !['date', 'time'].includes(cell.type) &&
          (+value).toFixed(cell.decimalPlaces ?? 0).length > cell.length
        )
          throw new Error(
            `Value for [${cell.fieldId}:${cell.name}] ${value} is longer than ${cell.length}`
          )
        try {
          cellText = padByType(
            cell.type,
            value as number | string,
            cell.length,
            cell.decimalPlaces
          )
        } catch (e) {
          throw new Error(
            `Error while padding value for ${JSON.stringify(
              cell
            )} - ${value} - ${e}`
          )
        }
      }

      // Validate length
      if (cellText.length !== cell.length) {
        throw new Error(
          `Value for [${cell.fieldId}:${cell.name}] ${cellText} should be of length ${cell.length}. Got ${cellText.length}`
        )
      }

      text += cellText
    }

    this.#lines.push(text)
  }

  private get encoding(): string {
    if (this.input.encoding === FileEncoding.CP_862) {
      return 'CP862'
    }
    return 'ISO-8859-8'
  }

  public async saveToFile() {
    this.create()
    this.validateBeforeSave()

    const text = this.#lines.join(BaseGenerator.NEW_LINE)

    await fs.mkdir(path.parse(this.#filePath).dir, { recursive: true })

    const buf = iconv.encode(text, this.encoding)
    await fs.writeFile(this.#filePath, buf)
  }
}
