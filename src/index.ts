import {dateToMMDDhhmm} from './utils/dates'
import {IniGenerator} from './generator/iniGenerator'
import {DataGenerator} from './generator/dataGenerator'
import {customAlphabet} from 'nanoid'
import * as path from 'path'
import * as fs from 'fs/promises'
import {DocumentType, RecordTypeCode, UniformStructureInput, USFResult} from './types'
import {zip} from 'zip-a-folder'
import {documentTypeLabel, recordTypeLabel} from "./utils/heLables";


function getResults(input: UniformStructureInput, iniFilePath: string, dataGenerator: DataGenerator): USFResult {

    // Group documents by type
    const groupedDocuments = input.documents.reduce((acc, document) => {
        if (!acc[document.documentType]) {
            acc[document.documentType] = []
        }
        acc[document.documentType].push(document)
        return acc
    }, {} as Record<DocumentType, typeof input.documents>)

    return {
        businessName: input.business.name,
        businessTaxId: input.business.taxId,
        fromDate: input.dataRangeStartDate ?? new Date(`${input.taxYear}-01-01`),
        toDate: input.dataRangeEndDate ?? new Date(`${input.taxYear}-12-31`),
        savePath: path.parse(iniFilePath).dir,
        softwareName: input.software.name,
        generatedAt: input.processStartDate,
        recordTypesDetails: [
            {
                code: 'A100',
                label: recordTypeLabel('A100'),
                totalRecords: 1,
            },
            ...Object.entries(dataGenerator.countRowsByType()).map(([code, qty], index) => {
                return {
                    code: code as RecordTypeCode,
                    label: recordTypeLabel(code as RecordTypeCode),
                    totalRecords: qty,
                }
            }),
            {
                code: 'Z900',
                label: recordTypeLabel('Z900'),
                totalRecords: 1,
            },

        ],
        dataValidationOutput: Object.entries(groupedDocuments).map(([documentType, docs]) => {
            return {
                documentTypeNumber: +documentType as DocumentType,
                documentTypeLabel: documentTypeLabel(+documentType as DocumentType),
                quantity: docs.length,
                sum: docs.reduce((acc, doc) => acc + +(doc.documentSumIncludingVat ?? 0), 0)
            }
        }),
    }
}

function getDirPath(input: UniformStructureInput): string {
    const taxIdWithoutCheckDigit = input.business.taxId.toString().slice(0, 8)
    const shortYear = input.processStartDate.getFullYear().toString().slice(2)
    return `OPENFRMT/${taxIdWithoutCheckDigit}.${shortYear}/${dateToMMDDhhmm(
        input.processStartDate
    )}`
}

export async function generateUSF(input: UniformStructureInput): Promise<USFResult> {
    const nanoid = customAlphabet('123456789', 15)
    const uuid = nanoid()

    const dirPath = getDirPath(input)
    const iniFilePath = path.join(dirPath, 'INI.txt')
    const dataFilePath = path.join(dirPath, 'BKMVDATA.txt')

    const dataGenerator = new DataGenerator(input, uuid, dataFilePath)
    await dataGenerator.saveToFile()

    const iniGenerator = new IniGenerator(
        input,
        uuid,
        iniFilePath,
        dataGenerator.countRowsByType()
    )
    await iniGenerator.saveToFile()

    // zip
    await zip('OPENFRMT', `OPENFRMT.zip`)

    // Delete the folder
    await fs.rm('OPENFRMT', {recursive: true, force: true})

    return getResults(input, iniFilePath, dataGenerator)
}

// main()
