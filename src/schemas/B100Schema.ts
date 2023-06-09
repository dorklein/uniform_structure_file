import {AccountingActions, HasBranches, Row} from '../types'
import {isValidCurrencyCode, isValidDate} from '../utils/validators'


export const B100Schema: Row<AccountingActions> = {
    cells: [
        {
            default: 'B100',
            required: true,
            length: 4,
            startAt: 1,
            endAt: 4,
            type: 'string',
            name: 'recordCode',
            description: 'קוד רשומה',
            fieldId: 1350,
        },
        {
            required: true,
            length: 9,
            startAt: 5,
            endAt: 13,
            type: 'number',
            name: 'runningNumber',
            description: 'מס רשומה בקובץ',
            fieldId: 1351,
        },
        {
            required: true,
            length: 9,
            startAt: 14,
            endAt: 22,
            type: 'number',
            name: 'business.taxId',
            description: 'מס עוסק מורשה',
            fieldId: 1352,
        },
        {
            required: true,
            length: 10,
            startAt: 23,
            endAt: 32,
            type: 'number',
            name: 'transactionNumber',
            description: 'מספר תנועה',
            fieldId: 1353,
        },
        {
            required: true,
            length: 5,
            startAt: 33,
            endAt: 37,
            type: 'number',
            name: 'transactionLineNumber',
            description: 'מספר שורה בתנועה',
            fieldId: 1354,
        },
        {
            required: false,
            length: 8,
            startAt: 38,
            endAt: 45,
            type: 'number',
            name: 'dish',
            description: 'מנה',
            fieldId: 1355,
        },
        {
            required: false,
            length: 15,
            startAt: 46,
            endAt: 60,
            type: 'string',
            name: 'transactionType',
            description: 'סוג תנועה',
            fieldId: 1356,
        },
        {
            required: false,
            length: 20,
            startAt: 61,
            endAt: 80,
            type: 'string',
            name: 'reference',
            description: 'אסמכתא',
            fieldId: 1357,
        },
        {
            required: false,
            length: 3,
            startAt: 81,
            endAt: 83,
            type: 'number',
            name: 'referenceDocumentType',
            description: 'סוג מסמך האסמכתא',
            fieldId: 1358,
        },
        {
            required: false,
            length: 20,
            startAt: 84,
            endAt: 103,
            type: 'string',
            name: 'reference2',
            description: 'אסמכתא 2',
            fieldId: 1359,
        },
        {
            required: false,
            length: 3,
            startAt: 104,
            endAt: 106,
            type: 'number',
            name: 'reference2DocumentType',
            description: 'סוג מסמך האסמכתא\n2',
            fieldId: 1360,
        },
        {
            required: false,
            length: 50,
            startAt: 107,
            endAt: 156,
            type: 'string',
            name: 'details',
            description: 'פרטים',
            fieldId: 1361,
        },
        {
            required: true,
            length: 8,
            startAt: 157,
            endAt: 164,
            type: 'date',
            name: 'date',
            description: 'תאריך',
            fieldId: 1362,
            validator: isValidDate,
        },
        {
            required: true,
            length: 8,
            startAt: 165,
            endAt: 172,
            type: 'date',
            name: 'valueDate',
            description: 'תאריך ערך',
            fieldId: 1363,
            validator: isValidDate,
        },
        {
            required: true,
            length: 15,
            startAt: 173,
            endAt: 187,
            type: 'string',
            name: 'accountKey',
            description: 'חשבון בתנועה',
            fieldId: 1364,
        },
        {
            required: false,
            length: 15,
            startAt: 188,
            endAt: 202,
            type: 'string',
            name: 'contraAccountKey',
            description: 'חשבון נגדי',
            fieldId: 1365,
        },
        {
            required: true,
            length: 1,
            startAt: 203,
            endAt: 203,
            type: 'number',
            name: 'actionType',
            description: 'סימן הפעולה',
            fieldId: 1366,
        },
        {
            required: true,
            length: 3,
            startAt: 204,
            endAt: 206,
            type: 'string',
            name: 'currencyCode',
            description: 'קוד מטבע מטח',
            fieldId: 1367,
            validator: isValidCurrencyCode,
        },
        {
            default: '0',
            required: false,
            length: 15,
            startAt: 207,
            endAt: 221,
            decimalPlaces: 2,
            type: 'positive',
            name: 'amount',
            description: 'סכום הפעולה',
            fieldId: 1368,
        },
        {
            default: '0',
            required: false,
            length: 15,
            startAt: 222,
            endAt: 236,
            decimalPlaces: 2,
            type: 'positive',
            name: 'foreignCurrencyAmount',
            description: 'סכום מטח',
            fieldId: 1369,
        },
        {
            required: false,
            length: 12,
            startAt: 237,
            endAt: 248,
            decimalPlaces: 2,
            type: 'string',
            name: 'quantity',
            description: 'שדה כמות',
            fieldId: 1370,
        },
        {
            required: false,
            length: 10,
            startAt: 249,
            endAt: 258,
            type: 'string',
            name: 'matchField1',
            description: 'שדה התאמה 1',
            fieldId: 1371,
        },
        {
            required: false,
            length: 10,
            startAt: 259,
            endAt: 268,
            type: 'string',
            name: 'matchField2',
            description: 'שדה התאמה 2',
            fieldId: 1372,
        },
        {
            required: (input) => input.business.hasBranches === HasBranches.YES,
            length: 7,
            startAt: 269,
            endAt: 275,
            type: 'string',
            name: 'business.branchId',
            description: 'מזהה סניף/ענף',
            fieldId: 1374,
        },
        {
            required: true,
            length: 8,
            startAt: 276,
            endAt: 283,
            type: 'date',
            name: 'entryDate',
            description: 'תאריך הזנה',
            fieldId: 1375,
            validator: isValidDate,
        },
        {
            required: false,
            length: 9,
            startAt: 284,
            endAt: 292,
            type: 'string',
            name: 'userWhoMadeTheAction',
            description: 'מבצע פעולה',
            fieldId: 1376,
        },
        {
            required: false,
            length: 25,
            startAt: 293,
            endAt: 317,
            type: 'string',
            name: 'forFutureData',
            description: 'שטח לנתונים עתידיים',
            fieldId: 1377,
        },
    ],
}
