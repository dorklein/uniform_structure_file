
export const emptyByLength = (length: number): string => Array(length).fill(' ').join('');
export const padNumbers = (number: number, length: number): string => {
    const str = number.toString();
    return Array(length - str.length).fill('0').join('') + str;
}

export const padString = (str: string, length: number): string => {
    return str + emptyByLength(length - str.length)
}

export const padByType = (type: 'string' | 'number', value: string | number, length: number): string => {
    if (value.toString().length > length) throw new Error(`Value ${value} is longer than ${length}`)

    if (type === 'string') {
        return padString(value as string, length)
    } else if (type === 'number') {
        return padNumbers(value as number, length)
    }
    throw new Error(`Invalid type ${type}`)
}
