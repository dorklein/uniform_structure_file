import { Cell, Row, UniformStructureInput } from './types'
import { isString, padByType } from './utils/strings'

export function createRow<T = undefined>(
  input: UniformStructureInput,
  rowSchema: Row<T>,
  getValue: (cell: Cell<T>) => string | number | Date | undefined,
  item: T
) {
  let text = ''

  for (const cell of rowSchema.cells) {
    const value = getValue(cell)

    if (value === undefined) {
      // Check if required is a function
      let required = cell.required
      if (typeof cell.required === 'function')
        required = cell.required(input, item)

      // Positive or Negative types have auto default value, even when required.
      if (required && !['positive', 'negative'].includes(cell.type)) {
        throw new Error(
          isString(required)
            ? required
            : `Required field [${cell.fieldId}]'${cell.name}' has no default value`
        )
      }

      text += padByType(cell.type, null, cell.length)
    } else {
      // Check if the value given isn't longer than the supported length
      if (
        value.toString().length > cell.length &&
        !['date', 'time'].includes(cell.type)
      )
        throw new Error(
          `Value for [${cell.fieldId}:${cell.name}] ${value} is longer than ${cell.length}`
        )

      try {
        text += padByType(cell.type, value as number | string, cell.length)
      } catch (e) {
        console.log(`lll: ${e} - ${value} = ${JSON.stringify(cell)}`)
      }
    }
  }

  text += '\n'
  return text
}
