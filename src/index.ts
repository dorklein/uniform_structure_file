import * as fs from 'fs/promises'


/**
 * @startuml
 * Bob->Alice : hello
 * @enduml
 */

const input = {}




export async function createINI() {
    const path = 'INI.txt'
    const text = 'Hello World!'
    await fs.writeFile(path, text)
    console.log('File written to', path)
}

export async function createBKMVDATA() {
    const path = 'BKMVDATA.txt'
    const text = 'Hello World!'
    await fs.writeFile(path, text)
    console.log('File written to', path)
}


export function main() {
    createINI()
    createBKMVDATA()
}

main()