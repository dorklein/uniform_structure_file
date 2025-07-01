import {DocumentRecord, DocumentType, Row} from '../types'
import {isOptionalValidCurrencyCode, isValidDate} from '../utils/validators'

export const C100Schema: Row<DocumentRecord> = {
    cells: [
        {
            fieldId: 1200,
            name: 'recordCode',
            description: 'קוד רשומה',
            type: 'string',
            length: 4,
            startAt: 1,
            endAt: 4,
            required: true,
            default: 'C100',
        },
        {
            fieldId: 1201,
            name: 'runningNumber',
            description: 'מס רשומה בקובץ',
            type: 'number',
            length: 9,
            startAt: 5,
            endAt: 13,
            required: true,
        },
        {
            fieldId: 1202,
            name: 'business.taxId',
            description: 'מספר עוסק מורשה',
            type: 'number',
            length: 9,
            startAt: 14,
            endAt: 22,
            required: true,
        },
        {
            fieldId: 1203,
            name: 'documentType',
            description: 'סוג מסמך',
            type: 'number',
            length: 3,
            startAt: 23,
            endAt: 25,
            required: true,
        },
        {
            fieldId: 1204,
            name: 'documentNumber',
            description: 'מספר מסמך',
            type: 'string',
            length: 20,
            startAt: 26,
            endAt: 45,
            required: true,
        },
        {
            fieldId: 1205,
            name: 'documentCreationDate',
            description: 'תאריך הפקת מסמך',
            type: 'date',
            length: 8,
            startAt: 46,
            endAt: 53,
            required: true,
            validator: isValidDate,
        },
        {
            fieldId: 1206,
            name: 'documentCreationTime',
            description: 'שעת הפקת מסמך',
            type: 'time',
            length: 4,
            startAt: 54,
            endAt: 57,
            required: true,
        },
        {
            fieldId: 1207,
            name: 'customerOrVendor.name',
            description: 'שם לקוח/ספק',
            type: 'string',
            length: 50,
            startAt: 58,
            endAt: 107,
            required: (input, item) => {
                return item.documentType >= 100 && item.documentType <= 710
            },
        },
        {
            fieldId: 1208,
            name: 'customerOrVendor.address.street',
            description: 'מען הלקוח/ספק - רחוב',
            type: 'string',
            length: 50,
            startAt: 108,
            endAt: 157,
            required: false,
        },
        {
            fieldId: 1209,
            name: 'customerOrVendor.address.houseNumber',
            description: 'מען הלקוח/ספק - מס בית',
            type: 'string',
            length: 10,
            startAt: 158,
            endAt: 167,
            required: false,
        },
        {
            fieldId: 1210,
            name: 'customerOrVendor.address.city',
            description: 'מען הלקוח/ספק - עיר',
            type: 'string',
            length: 30,
            startAt: 168,
            endAt: 197,
            required: false,
        },
        {
            fieldId: 1211,
            name: 'customerOrVendor.address.zipCode',
            description: 'מען הלקוח/ספק - מיקוד',
            type: 'string',
            length: 8,
            startAt: 198,
            endAt: 205,
            required: false,
        },
        {
            fieldId: 1212,
            name: 'customerOrVendor.address.country',
            description: 'מען הלקוח/ספק - מדינה',
            type: 'string',
            length: 30,
            startAt: 206,
            endAt: 235,
            required: false,
        },
        {
            fieldId: 1213,
            name: 'customerOrVendor.address.countryCode',
            description: 'מען הלקוח/ספק - קוד מדינה',
            type: 'string',
            length: 2,
            startAt: 236,
            endAt: 237,
            required: false,
        },
        {
            fieldId: 1214,
            name: 'customerOrVendor.phone',
            description: 'טלפון לקוח/ספק',
            type: 'string',
            length: 15,
            startAt: 238,
            endAt: 252,
            required: false,
        },
        {
            fieldId: 1215,
            name: 'customerOrVendor.taxId',
            description: 'מס עוסק מורשה לקוח/ספק',
            type: 'number',
            length: 9,
            startAt: 253,
            endAt: 261,
            required: false,
        },
        {
            fieldId: 1216,
            name: 'valueDate',
            description: 'תאריך ערך',
            type: 'date',
            length: 8,
            startAt: 262,
            endAt: 269,
            required: true,
            validator: isValidDate,
        },
        {
            fieldId: 1217,
            name: 'finalSumInForeignCurrency',
            description: 'סכום סופי של המסמך במט"ח',
            type: 'positive',
            length: 15,
            startAt: 270,
            endAt: 284,
            decimalPlaces: 2,
            required: false,
        },
        {
            fieldId: 1218,
            name: 'currencyCode',
            description: 'קוד מט"ח',
            type: 'string',
            length: 3,
            startAt: 285,
            endAt: 287,
            required: false,
            validator: isOptionalValidCurrencyCode,
        },
        {
            fieldId: 1219,
            name: 'documentSumBeforeDiscount',
            description: 'סכום המסמך לפני הנחת מסמך',
            type: 'positive',
            length: 15,
            startAt: 288,
            endAt: 302,
            decimalPlaces: 2,
            required: true,
            validator: (value, item) => {
                if (!value) return false

                let expected: number
                if ([DocumentType.RECEIPT, DocumentType.DONATION_RECEIPT].includes(item.documentType)) {
                    expected = item.payments.reduce(
                        (acc, item) => acc + +item.amount,
                        0
                    )
                } else {
                    expected = item.items.reduce(
                        (acc, item) => acc + +item.lineTotal,
                        0
                    )
                }
                return (
                    +value === expected ||
                    `documentSumBeforeDiscount should be ${expected} (accumulation of the doc's items lineTotal) but got ${value}`
                )
            },
        },
        {
            fieldId: 1220,
            name: 'discount',
            description: 'הנחת מסמך',
            type: 'negative',
            length: 15,
            startAt: 303,
            endAt: 317,
            decimalPlaces: 2,
            required: true,
        },
        {
            fieldId: 1221,
            name: 'documentSumAfterDiscountExcludingVat',
            description: 'סכום המסמך לאחר הנחות ללא מע"מ',
            type: 'positive',
            length: 15,
            startAt: 318,
            endAt: 332,
            decimalPlaces: 2,
            required: true,
            validator: (value, item) => {
                const beforeDiscount = +item.documentSumBeforeDiscount
                const discount = +(item.discount ?? 0)
                const expected = beforeDiscount - discount

                return (
                    value === `${expected}` ||
                    `documentSumAfterDiscountExcludingVat (${value}) must be equal to documentSumBeforeDiscount (${beforeDiscount}) - discount (${discount}) = ${expected}`
                )
            },
        },
        {
            fieldId: 1222,
            name: 'vatSum',
            description: 'סכום המע"מ',
            type: 'positive',
            length: 15,
            startAt: 333,
            endAt: 347,
            decimalPlaces: 2,
            required: true,
        },
        {
            fieldId: 1223,
            name: 'documentSumIncludingVat',
            description: 'סכום המסמך כולל מע"מ',
            type: 'positive',
            length: 15,
            startAt: 348,
            endAt: 362,
            decimalPlaces: 2,
            required: true,
            validator: (value, item) => {
                const vatSum = +(item.vatSum ?? 0)
                const documentSumAfterDiscountExcludingVat = +(
                    item.documentSumAfterDiscountExcludingVat ?? 0
                )
                const expected = documentSumAfterDiscountExcludingVat + vatSum

                return (
                    value === `${expected}` ||
                    `documentSumIncludingVat must be equal to documentSumAfterDiscountExcludingVat + vatSum - expected(${expected}), actual(${value})`
                )
            },
        },
        {
            fieldId: 1224,
            name: 'deductionAtSourceSum',
            description: 'סכום הניכוי במקור',
            type: 'positive',
            length: 12,
            startAt: 363,
            endAt: 374,
            decimalPlaces: 2,
            required: true,
        },
        {
            fieldId: 1225,
            name: 'customerOrVendor.key',
            description: 'מפתח הלקוח אצל המוכר או מפתח הספק אצל הקונה',
            type: 'string',
            length: 15,
            startAt: 375,
            endAt: 389,
            required: (input, item) => {
                return item.documentType >= 100 && item.documentType <= 710
            },
        },
        {
            fieldId: 1226,
            name: 'matchingField',
            description: 'שדה התאמה',
            type: 'string',
            length: 10,
            startAt: 390,
            endAt: 399,
            required: false,
        },
        {
            fieldId: 1228,
            name: 'isCanceled',
            description: 'מסמך מבוטל',
            type: 'boolean', // 1
            length: 1,
            startAt: 400,
            endAt: 400,
            required: false,
        },
        {
            fieldId: 1230,
            name: 'documentDate',
            description: 'תאריך המסמך',
            type: 'date',
            length: 8,
            startAt: 401,
            endAt: 408,
            required: true,
            validator: isValidDate,
        },
        {
            fieldId: 1231,
            name: 'business.branchId',
            description: 'מזהה סניף/ענף',
            type: 'string',
            length: 7,
            startAt: 409,
            endAt: 415,
            required: false,
        },
        {
            fieldId: 1233,
            name: 'actionCode',
            description: 'מבצע הפעולה',
            type: 'string',
            length: 9,
            startAt: 416,
            endAt: 424,
            required: false,
        },
        {
            fieldId: 1234,
            name: 'linkField',
            description: 'שדה מקשר לשורה',
            type: 'number',
            length: 7,
            startAt: 425,
            endAt: 431,
            required: true,
        },
        {
            fieldId: 1235,
            name: 'forFutureData',
            description: 'שטח לנתונים עתידיים',
            type: 'string',
            length: 13,
            startAt: 432,
            endAt: 444,
            required: false,
        },
    ],
}
