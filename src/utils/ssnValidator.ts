export function ssnValidator(id: string | number) {
  id = id.toString().padStart(9, '0')
  if (isNaN(+id)) {
    return false
  }
  let sum = 0,
    incNum
  for (let i = 0; i < id.length; i++) {
    incNum = +id[i] * ((i % 2) + 1) // Multiply number by 1 or 2
    sum += incNum > 9 ? incNum - 9 : incNum // Sum the digits up and add to total
  }
  return sum % 10 === 0
}

export function getCheckDigit(id: string | number): number {
  id = id.toString().padStart(8, '0')
  if (isNaN(+id)) {
    // Make sure ID is formatted properly
    throw new Error('Invalid ID')
  }
  let sum = 0,
    incNum
  for (let i = 0; i < id.length; i++) {
    incNum = +id[i] * ((i % 2) + 1) // Multiply number by 1 or 2
    sum += incNum > 9 ? incNum - 9 : incNum // Sum the digits up and add to total
  }
  return 10 - (sum % 10)
}
