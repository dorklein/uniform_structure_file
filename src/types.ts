

export enum HasBranches {
    NO = 0,
    YES = 1,
}
export interface BusinessAddress {
    street?: string
    houseNumber?: string
    city?: string
    zipCode?: string
}
export interface BusinessData {
    taxId: number
    companyId?: number  // ח״פ
    name: string
    address?: BusinessAddress
    hasBranches: HasBranches
}

export enum SoftwareType {
    singleYear = 1,
    multiYear = 2,
}
export enum SoftwareAccountingType {
    notRelevant = 0,
    singleEntry = 1,
    doubleEntry = 2,
}
export enum RequiredAccountingBalance {
    trafficLevel = 1,
    doseLevel = 2,
}
export interface SoftwareData {
    registrationNumber: number
    name: string
    version: string
    companyTaxId: number
    companyName: string
    type: SoftwareType
    accountingType: SoftwareAccountingType
    requiredAccountingBalance?: RequiredAccountingBalance
}

export enum LanguageCode {
    hebrew = 0,
    arabic = 1,
    other = 2,
}

export enum FileEncoding {
    IOS_8859_8= 1,
    CP_862 = 2,
}

export interface UniformStructureInput {
    software: SoftwareData
    business: BusinessData
    taxYear?: number
    dataRangeStartDate?: Date
    dataRangeEndDate?: Date
    processStartDate: Date
    languageCode: LanguageCode
    leadingCurrency: string
    encoding: FileEncoding
    compressionSoftware: string
}

export interface Cell {
    fieldId: number
    name?: string
    description: string
    type: 'string' | 'number'
    length: number
    startAt: number
    endAt: number
    required: boolean | ((input: UniformStructureInput) => boolean)
    default?: string | number
}

export interface Row {
    cells: Cell[]
}

export interface INIFormat {
    header: Row
    summaryRow: Row
}

export interface BKMVDATAFormat {
    header: Row
    footer: Row
    c100Row: Row
    D110Row: Row
    D120Row: Row
    B100Row: Row
    B110Row: Row
    M100Row: Row

}