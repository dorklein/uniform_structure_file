import * as fs from 'fs/promises'


/**
 * @startuml
 * Bob->Alice : hello
 * @enduml
 */

const input = {}

interface Cell {
    fieldId: number
    description: string
    type: 'string' | 'number' | 'date'
    length: number
    startAt: number
    endAt: number
    required: boolean
    default?: string | number | Date
}

interface Row {
    cells: Cell[]
}

interface INIFormat {
    header: Row
    summaryRow: Row
}

interface BKMVDATAFormat {
    header: Row
    footer: Row
}

const iniFormat: INIFormat = {
    header: {
        cells: [
                {
                    fieldId: 1000,
                    description: 'קוד רשומה',
                    type: 'string',
                    length: 4,
                    startAt: 1,
                    endAt: 4,
                    required: true,
                    default: 'A000',
                },
                {
                    fieldId: 1001,
                    description: 'לשימוש עתידי',
                    type: 'string',
                    length: 5,
                    startAt: 5,
                    endAt: 9,
                    required: false,
                    default: '     ',
                },
                {
                    fieldId: 1002,
                    description: 'סך רשומות בקובץ BKMVDATA',
                    type: 'number',
                    length: 15,
                    startAt: 10,
                    endAt: 24,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1003,
                    description: 'מספר עוסק מורשה',
                    type: 'number',
                    length: 9,
                    startAt: 25,
                    endAt: 33,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1004,
                    description: 'מזהה ראשי',
                    type: 'number',
                    length: 15,
                    startAt: 34,
                    endAt: 48,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1005,
                    description: 'קבוע מערכת',
                    type: 'string',
                    length: 8,
                    startAt: 49,
                    endAt: 56,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1006,
                    description: 'מספר רישום התוכנה',
                    type: 'number',
                    length: 8,
                    startAt: 57,
                    endAt: 64,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1007,
                    description: 'שם התוכנה',
                    type: 'string',
                    length: 20,
                    startAt: 65,
                    endAt: 84,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1008,
                    description: 'מהדורת התוכנה',
                    type: 'string',
                    length: 20,
                    startAt: 85,
                    endAt: 104,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1009,
                    description: 'מספר ע"מ של יצרן התוכנה',
                    type: 'number',
                    length: 9,
                    startAt: 105,
                    endAt: 113,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1010,
                    description: 'שם יצרן התוכנה',
                    type: 'string',
                    length: 20,
                    startAt: 114,
                    endAt: 133,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1011,
                    description: 'סוג התוכנה',
                    type: 'number', // 1= חד שנתי, 2 = רב שנתי
                    length: 1,
                    startAt: 134,
                    endAt: 134,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1012,
                    description: 'נתיב מיקום שמירת הקבצים',
                    type: 'string',
                    length: 50,
                    startAt: 135,
                    endAt: 184,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1013,
                    description: 'סוג הנהח"ש של התוכנה',
                    type: 'number',
                    length: 1,
                    startAt: 185,
                    endAt: 185,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1014,
                    description: 'איזון חשבונאי נדרש',
                    type: 'number',
                    length: 1,
                    startAt: 186,
                    endAt: 186,
                    required: false,
                    default: 0,
                },
                {
                    fieldId: 1015,
                    description: 'מספר חברה ברשם החברות',
                    type: 'number',
                    length: 9,
                    startAt: 187,
                    endAt: 195,
                    required: false,
                    default: 0,
                },
                {
                    fieldId: 1016,
                    description: 'מספר תיק ניכויים',
                    type: 'number',
                    length: 9,
                    startAt: 196,
                    endAt: 204,
                    required: false,
                    default: 0,
                },
                {
                    fieldId: 1017,
                    description: 'שטח נתונים עתידי',
                    type: 'string',
                    length: 10,
                    startAt: 205,
                    endAt: 214,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1018,
                    description: 'שם העסק',
                    type: 'string',
                    length: 50,
                    startAt: 215,
                    endAt: 264,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1019,
                    description: 'מען העסק - רחוב',
                    type: 'string',
                    length: 50,
                    startAt: 265,
                    endAt: 314,
                    required: false,
                    default: 0,
                },
                {
                    fieldId: 1020,
                    description: 'מען העסק - מס בית',
                    type: 'string',
                    length: 10,
                    startAt: 315,
                    endAt: 324,
                    required: false,
                    default: 0,
                },
                {
                    fieldId: 1021,
                    description: 'מען העסק - עיר',
                    type: 'string',
                    length: 30,
                    startAt: 325,
                    endAt: 354,
                    required: false,
                    default: 0,
                },
                {
                    fieldId: 1022,
                    description: 'מען העסק - מיקוד',
                    type: 'string',
                    length: 8,
                    startAt: 355,
                    endAt: 362,
                    required: false,
                    default: 0,
                },
                {
                    fieldId: 1023,
                    description: 'שנת המס',
                    type: 'number',
                    length: 4,
                    startAt: 363,
                    endAt: 366,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1024,
                    description: 'טווח נתונים - תאריך התחלה/חיתוך',
                    type: 'number',
                    length: 8,
                    startAt: 367,
                    endAt: 374,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1025,
                    description: 'טווח נתונים - תאריך סיום/חיתוך',
                    type: 'number',
                    length: 8,
                    startAt: 375,
                    endAt: 382,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1026,
                    description: 'תאריך תחילת התהליך',
                    type: 'number', // YYYYMMDD
                    length: 8,
                    startAt: 383,
                    endAt: 390,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1027,
                    description: 'שעת התחלת התהליך',
                    type: 'number', // HHMM
                    length: 4,
                    startAt: 391,
                    endAt: 394,
                    required: true,
                    default: 0,
                },
                /**
                 * 0 - עברית
                 * 1 - ערבית
                 * 2 - אחר
                 */
                {
                    fieldId: 1028,
                    description: 'קוד שפה',
                    type: 'number', // 0 - עברית, 1 - ערבית, 2 - אחר
                    length: 1,
                    startAt: 395,
                    endAt: 395,
                    required: true,
                    default: 0,
                },
                /**
                 * -862CP = 2
                 * i-8859-8-ISO = 1
                 */
                {
                    fieldId: 1029,
                    description: 'סט תוים',
                    type: 'number', // -862CP = 2; i-8859-8-ISO =1
                    length: 1,
                    startAt: 396,
                    endAt: 396,
                    required: true,
                    default: 0,
                }, {
                    fieldId: 1030,
                    description: 'שם תוכנת הכיווץ',
                    type: 'string',
                    length: 20,
                    startAt: 397,
                    endAt: 416,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1032,
                    description: 'מטבע מוביל',
                    type: 'string',
                    length: 3,
                    startAt: 417,
                    endAt: 419,
                    required: true,
                    default: 0,
                },
                /**
                 * 1 - בעסק יש סניפים /ענפים
                 * 0 - בעסק  סניפים . ראה הבהרה 3 בנספח
                 * הבהרות.
                 */
                {
                    fieldId: 1034,
                    description: 'מידע על סניפים /ענפים',
                    type: 'number',
                    length: 1,
                    startAt: 420,
                    endAt: 420,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1035,
                    description: 'שטח לנתונים עתידיים',
                    type: 'string',
                    length: 46,
                    startAt: 421,
                    endAt: 466,
                    required: false,
                    default: '',
                },
            ],
    },
    summaryRow: {
            cells: [
                {
                    fieldId: 1050,
                    description: 'קוד רשומה',
                    type: 'string',
                    length: 4,
                    startAt: 1,
                    endAt: 4,
                    required: true,
                    default: 0,
                },
                {
                    fieldId: 1051,
                    description: 'סך רשומות',
                    type: 'number',
                    length: 15,
                    startAt: 5,
                    endAt: 19,
                    required: true,
                    default: 0,
                }
            ],
        },
}

const bkmvdataFormat: BKMVDATAFormat = {
    header: {
        cells: [
            {
                fieldId: 1100,
                description: 'קוד רשומה',
                type: 'string',
                length: 4,
                startAt: 1,
                endAt: 4,
                required: true,
                default: 'A100',
            },
            {
                fieldId: 1101,
                description: 'מס רשומה בקובץ',
                type: 'number',
                length: 9,
                startAt: 5,
                endAt: 13,
                required: true,
                default: 0,
            },
            {
                fieldId: 1102,
                description: 'מספר עוסק מורשה',
                type: 'number',
                length: 9,
                startAt: 14,
                endAt: 22,
                required: true,
                default: 0,
            },
            {
                fieldId: 1103,
                description: 'מזהה ראשי',
                type: 'number',
                length: 15,
                startAt: 23,
                endAt: 37,
                required: true,
                default: 0,
            },
            {
                fieldId: 1104,
                description: 'קבוע מערכת',
                type: 'string',
                length: 8,
                startAt: 38,
                endAt: 45,
                required: true,
                default: 0,
            },
            {
                fieldId: 1105,
                description: 'שטח לנתונים עתידיים',
                type: 'string',
                length: 50,
                startAt: 46,
                endAt: 95,
                required: true,
                default: '',
            },
        ],
    },
    footer: {
        cells: [
            {
                fieldId: 1150,
                description: 'קוד רשומה',
                type: 'string',
                length: 4,
                startAt: 1,
                endAt: 4,
                required: true,
                default: 'Z900',
            },
            {
                fieldId: 1151,
                description: 'מס רשומה בקובץ',
                type: 'number',
                length: 9,
                startAt: 5,
                endAt: 13,
                required: true,
                default: 0,
            },
            {
                fieldId: 1152,
                description: 'מספר עוסק מורשה',
                type: 'number',
                length: 9,
                startAt: 14,
                endAt: 22,
                required: true,
                default: 0,
            },
            {
                fieldId: 1153,
                description: 'מזהה ראשי',
                type: 'number',
                length: 15,
                startAt: 23,
                endAt: 37,
                required: true,
                default: 0,
            },
            {
                fieldId: 1154,
                description: 'קבוע מערכת',
                type: 'string',
                length: 8,
                startAt: 38,
                endAt: 45,
                required: true,
                default: 0,
            },
            {
                fieldId: 1155,
                description: 'סך רשומות כולל בקובץ',
                type: 'number',
                length: 15,
                startAt: 46,
                endAt: 60,
                required: true,
                default: 0,
            },
            {
                fieldId: 1155,
                description: 'שטח לנתונים עתידיים',
                type: 'string',
                length: 50,
                startAt: 61,
                endAt: 110,
                required: true,
                default: '',
            },
        ],
    },
}


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