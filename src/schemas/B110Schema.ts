import { HasBranches, Row, SoftwareAccountingType } from '../types'
import { isOptionalValidCurrencyCode } from '../utils/validators'

export const B110Schema: Row = {
  cells: [
    {
      default: 'B110',
      required: true,
      length: 4,
      startAt: 1,
      endAt: 4,
      type: 'string',
      name: 'recordCode',
      description: 'קוד רשומה',
      fieldId: 1400,
    },
    {
      required: true,
      length: 9,
      startAt: 5,
      endAt: 13,
      type: 'number',
      name: 'runningNumber',
      description: 'מס רשומה בקובץ',
      fieldId: 1401,
    },
    {
      required: true,
      length: 9,
      startAt: 14,
      endAt: 22,
      type: 'number',
      name: 'business.taxId',
      description: 'מס עוסק מורשה',
      fieldId: 1402,
    },
    {
      required: true,
      length: 15,
      startAt: 23,
      endAt: 37,
      type: 'string',
      name: 'accountKey',
      description: 'מפתח החשבון',
      fieldId: 1403,
    },
    {
      required: true,
      length: 50,
      startAt: 38,
      endAt: 87,
      type: 'string',
      name: 'accountName',
      description: 'שם החשבון',
      fieldId: 1404,
    },
    {
      required: true,
      length: 15,
      startAt: 88,
      endAt: 102,
      type: 'string',
      name: 'accountBalanceCode',
      description: 'קוד מאזן בוחן',
      fieldId: 1405,
    },
    {
      required: true,
      length: 30,
      startAt: 103,
      endAt: 132,
      type: 'string',
      name: 'accountBalanceCodeDescription',
      description: 'תיאור קוד מאזן בוחן',
      fieldId: 1406,
    },
    {
      required: false,
      length: 50,
      startAt: 133,
      endAt: 182,
      type: 'string',
      name: 'address.street',
      description: 'מען הלקוח/ספק - רחוב',
      fieldId: 1407,
    },
    {
      required: false,
      length: 10,
      startAt: 183,
      endAt: 192,
      type: 'string',
      name: 'address.houseNumber',
      description: 'מען הלקוח/ספק - מספר בית',
      fieldId: 1408,
    },
    {
      required: false,
      length: 30,
      startAt: 193,
      endAt: 222,
      type: 'string',
      name: 'address.city',
      description: 'מען הלקוח/ספק - עיר',
      fieldId: 1409,
    },
    {
      required: false,
      length: 8,
      startAt: 223,
      endAt: 230,
      type: 'string',
      name: 'address.zipCode',
      description: 'מען הלקוח/ספק - מיקוד',
      fieldId: 1410,
    },
    {
      required: false,
      length: 30,
      startAt: 231,
      endAt: 260,
      type: 'string',
      name: 'address.country',
      description: 'מען הלקוח/ספק - מדינה',
      fieldId: 1411,
    },
    {
      required: false,
      length: 2,
      startAt: 261,
      endAt: 262,
      type: 'string',
      name: 'address.countryCode',
      description: 'קוד מדינה',
      fieldId: 1412,
    },
    {
      required: false,
      length: 15,
      startAt: 263,
      endAt: 277,
      type: 'string',
      name: 'centerAccount',
      description: 'חשבון מרכז',
      fieldId: 1413,
    },
    {
      required: true,
      length: 15,
      startAt: 278,
      endAt: 292,
      type: 'positive',
      name: 'openingBalance',
      description: 'יתרת החשבון בתחילת החתך',
      fieldId: 1414,
    },
    {
      required: true,
      length: 15,
      startAt: 293,
      endAt: 307,
      type: 'positive',
      name: 'totalDebit',
      description: 'סה"כ חובה',
      fieldId: 1415,
    },
    {
      required: true,
      length: 15,
      startAt: 308,
      endAt: 322,
      type: 'positive',
      name: 'totalCredit',
      description: 'סה"כ זכות',
      fieldId: 1416,
    },
    {
      required: false,
      length: 4,
      startAt: 323,
      endAt: 326,
      type: 'number',
      name: 'govClassificationCode',
      description: 'קוד בסיווג החשבונאי',
      fieldId: 1417,
    },
    {
      required: (input) =>
        input.software.accountingType === SoftwareAccountingType.doubleEntry,
      length: 9,
      startAt: 327,
      endAt: 335,
      type: 'number',
      name: 'customerOrVendorTaxId',
      description: 'מספר עוסק של ספק/לקוח',
      fieldId: 1419,
    },
    {
      required: (input) => input.business.hasBranches === HasBranches.YES,
      length: 7,
      startAt: 336,
      endAt: 342,
      type: 'string',
      name: 'business.branchId',
      description: 'מזהה סניף/ענף',
      fieldId: 1421,
    },
    {
      required: false,
      length: 15,
      startAt: 343,
      endAt: 357,
      type: 'positive',
      name: 'openingBalanceInForeignCurrency',
      description: 'יתרת חשבון בתחילת חתך\nבמט"ח',
      fieldId: 1422,
    },
    {
      required: false,
      length: 3,
      startAt: 358,
      endAt: 360,
      type: 'string',
      name: 'currencyCode',
      description: 'קוד מטבע יתרת החשבון בתחילת חתך במט"ח',
      fieldId: 1423,
      validator: isOptionalValidCurrencyCode,
    },
    {
      required: false,
      length: 16,
      startAt: 361,
      endAt: 376,
      type: 'string',
      name: 'forFutureData',
      description: 'שטח לנתונים עתידיים',
      fieldId: 1424,
    },
  ],
}
