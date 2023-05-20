import { Row } from '../types'

export const M100Schema: Row = {
  cells: [
    {
      default: 'M100',
      required: true,
      length: 4,
      startAt: 1,
      endAt: 4,
      type: 'string',
      name: 'recordType',
      description: 'קוד רשומה',
      fieldId: 1450,
    },
    {
      required: true,
      length: 9,
      startAt: 5,
      endAt: 13,
      type: 'number',
      name: 'runningNumber',
      description: 'מס רשומה בקובץ',
      fieldId: 1451,
    },
    {
      required: true,
      length: 9,
      startAt: 14,
      endAt: 22,
      type: 'number',
      name: 'business.taxId',
      description: 'מס עוסק מורשה',
      fieldId: 1452,
    },
    {
      required: false,
      length: 20,
      startAt: 23,
      endAt: 42,
      type: 'string',
      name: 'universalItemCode',
      description: 'מק"ט פריט אוניברסלי',
      fieldId: 1453,
    },
    {
      required: false,
      length: 20,
      startAt: 43,
      endAt: 62,
      type: 'string',
      name: 'supplierItemCode',
      description: 'מק"ט הספק/יצרן ) במסמכי רכש (',
      fieldId: 1454,
    },
    {
      required: true,
      length: 20,
      startAt: 63,
      endAt: 82,
      type: 'string',
      name: 'internalItemCode',
      description: 'מק"ט פנימי',
      fieldId: 1455,
    },
    {
      required: true,
      length: 50,
      startAt: 83,
      endAt: 132,
      type: 'string',
      name: 'itemName',
      description: 'שם פריט',
      fieldId: 1456,
    },
    {
      required: false,
      length: 10,
      startAt: 133,
      endAt: 142,
      type: 'string',
      name: 'sortingCode',
      description: 'קוד מיון',
      fieldId: 1457,
    },
    {
      required: false,
      length: 30,
      startAt: 143,
      endAt: 172,
      type: 'string',
      name: 'sortingCodeDescription',
      description: 'תיאור קוד מיון',
      fieldId: 1458,
    },
    {
      default: 'יחידה',
      required: true,
      length: 20,
      startAt: 173,
      endAt: 192,
      type: 'string',
      name: 'unitOfMeasure',
      description: 'תיאור יחידת מידה',
      fieldId: 1459,
    },
    {
      required: true,
      length: 12,
      startAt: 193,
      endAt: 204,
      decimalPlaces: 2,
      type: 'string',
      name: 'openingBalance',
      description: 'יתרת הפריט לתחילת\nהחתך',
      fieldId: 1460,
    },
    {
      required: true,
      length: 12,
      startAt: 205,
      endAt: 216,
      decimalPlaces: 2,
      type: 'positive',
      name: 'totalEntries',
      description: 'סך הכל כניסות',
      fieldId: 1461,
    },
    {
      required: true,
      length: 12,
      startAt: 217,
      endAt: 228,
      decimalPlaces: 2,
      type: 'positive',
      name: 'totalOutputs',
      description: 'סך הכל יציאות',
      fieldId: 1462,
    },
    {
      required: false,
      length: 10,
      startAt: 229,
      endAt: 238,
      decimalPlaces: 2,
      type: 'number',
      name: 'costPriceOutside',
      description: 'מחיר עלות במלאי לסוף תקופת החתך מחוץ למחסני ערובה',
      fieldId: 1463,
    },
    {
      required: false,
      length: 10,
      startAt: 239,
      endAt: 248,
      decimalPlaces: 2,
      type: 'number',
      name: 'costPrice',
      description: 'מחיר עלות במלאי לסוף תקופת החתך במחסני\nערובה',
      fieldId: 1464,
    },
    {
      required: false,
      length: 50,
      startAt: 249,
      endAt: 298,
      type: 'string',
      name: 'forFutureData',
      description: 'שטח לנתונים עתידיים',
      fieldId: 1465,
    },
  ],
}