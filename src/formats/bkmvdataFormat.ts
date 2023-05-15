import {
  BKMVDATAFormat,
  CreditCardCompany,
  CreditCardTransactionType,
  CustomerOrVendorAddress,
  PaymentMethod,
  TransactionType,
} from '../types'

export interface CustomerOrVendor {
  taxId?: number
  name: string
  address?: CustomerOrVendorAddress
  phone?: string
  key?: string
}
export interface DocumentRecord {
  documentType: DocumentType
  documentNumber: number
  documentCreationDate: Date
  customerOrVendor: CustomerOrVendor
  valueDate: Date
  finalSumInForeignCurrency?: number
  currencyCode?: string
  documentSumBeforeDiscount?: string
  discount?: string
  documentSumAfterDiscountExcludingVat?: string
  vatSum?: string
  documentSumIncludingVat?: string
  deductionAtSourceSum?: string

  // D110
  transactionType: TransactionType
  catalogId?: string
  description: string
  manufacturerName?: string
  manufacturerSerialNumber?: string
  unitOfMeasure?: string
  quantity: string
  unitPriceExcludingVAT: string
  lineDiscount?: string
  lineTotal: string
  lineVATRate: number

  // D120
  paymentMethod: PaymentMethod
  bankId?: string
  branchId?: string
  accountNumber?: string
  checkNumber?: string
  paymentDueDate?: Date
  amount: string
  creditCardCompany?: CreditCardCompany
  creditCardName?: string
  creditCardTransactionType?: CreditCardTransactionType
}

// Create an enum in english from the documentTypes array
export const bkmvdataFormat: BKMVDATAFormat = {
  header: {
    cells: [
      {
        fieldId: 1100,
        name: 'recordCode',
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
        name: 'runningNumber',
        description: 'מס רשומה בקובץ',
        type: 'number',
        length: 9,
        startAt: 5,
        endAt: 13,
        required: true,
      },
      {
        fieldId: 1102,
        name: 'business.taxId',
        description: 'מספר עוסק מורשה',
        type: 'number',
        length: 9,
        startAt: 14,
        endAt: 22,
        required: true,
      },
      {
        fieldId: 1103,
        name: 'uuid',
        description: 'מזהה ראשי',
        type: 'number',
        length: 15,
        startAt: 23,
        endAt: 37,
        required: true,
      },
      {
        fieldId: 1104,
        description: 'קבוע מערכת',
        type: 'string',
        length: 8,
        startAt: 38,
        endAt: 45,
        required: true,
        default: '&OF1.31&',
      },
      {
        fieldId: 1105,
        description: 'שטח לנתונים עתידיים',
        type: 'string',
        length: 50,
        startAt: 46,
        endAt: 95,
        required: false,
      },
    ],
  },
  footer: {
    cells: [
      {
        fieldId: 1150,
        name: 'recordCode',
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
        name: 'runningNumber',
        description: 'מס רשומה בקובץ',
        type: 'number',
        length: 9,
        startAt: 5,
        endAt: 13,
        required: true,
      },
      {
        fieldId: 1152,
        name: 'business.taxId',
        description: 'מספר עוסק מורשה',
        type: 'number',
        length: 9,
        startAt: 14,
        endAt: 22,
        required: true,
      },
      {
        fieldId: 1153,
        name: 'uuid',
        description: 'מזהה ראשי',
        type: 'number',
        length: 15,
        startAt: 23,
        endAt: 37,
        required: true,
      },
      {
        fieldId: 1154,
        description: 'קבוע מערכת',
        type: 'string',
        length: 8,
        startAt: 38,
        endAt: 45,
        required: true,
      },
      {
        fieldId: 1155,
        name: 'totalRecords',
        description: 'סך רשומות כולל בקובץ',
        type: 'number',
        length: 15,
        startAt: 46,
        endAt: 60,
        required: true,
      },
      {
        fieldId: 1155,
        description: 'שטח לנתונים עתידיים',
        type: 'string',
        length: 50,
        startAt: 61,
        endAt: 110,
        required: false,
      },
    ],
  },
  c100Row: {
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
        type: 'number',
        length: 8,
        startAt: 46,
        endAt: 53,
        required: true,
      },
      {
        fieldId: 1206,
        name: 'documentCreationTime',
        description: 'שעת הפקת מסמך',
        type: 'number',
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
        required: (input) =>
          input.documentType >= 100 && input.documentType <= 710,
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
        type: 'string',
        length: 9,
        startAt: 253,
        endAt: 261,
        required: false,
      },
      {
        fieldId: 1216,
        name: 'valueDate',
        description: 'תאריך ערך',
        type: 'number',
        length: 8,
        startAt: 262,
        endAt: 269,
        required: true,
      },
      {
        fieldId: 1217,
        name: 'finalSumInForeignCurrency',
        description: 'סכום סופי של המסמך במט"ח',
        type: 'positive',
        length: 15,
        startAt: 270,
        endAt: 284,
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
      },
      {
        fieldId: 1219,
        name: 'documentSumBeforeDiscount',
        description: 'סכום המסמך לפני הנחת מסמך',
        type: 'positive',
        length: 15,
        startAt: 288,
        endAt: 302,
        required: true,
      },
      {
        fieldId: 1220,
        name: 'discount',
        description: 'הנחת מסמך',
        type: 'negative',
        length: 15,
        startAt: 303,
        endAt: 317,
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
        required: true,
      },
      {
        fieldId: 1222,
        name: 'vatSum',
        description: 'סכום המע"מ',
        type: 'positive',
        length: 15,
        startAt: 333,
        endAt: 347,
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
        required: true,
      },
      {
        fieldId: 1224,
        name: 'deductionAtSourceSum',
        description: 'סכום הניכוי במקור',
        type: 'positive',
        length: 12,
        startAt: 363,
        endAt: 374,
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
        required: (input) =>
          input.documentType >= 100 && input.documentType <= 710,
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
        type: 'number',
        length: 8,
        startAt: 401,
        endAt: 408,
        required: true,
      },
      {
        fieldId: 1231,
        name: 'branchId',
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
        description: 'שטח לנתונים עתידיים',
        type: 'string',
        length: 13,
        startAt: 432,
        endAt: 444,
        required: false,
      },
    ],
  },
  D110Row: {
    cells: [
      {
        default: 'D110',
        required: true,
        length: 4,
        startAt: 1,
        endAt: 4,
        type: 'string',
        name: 'recordCode',
        description: 'קוד רשומה',
        fieldId: 1250,
      },
      {
        required: true,
        length: 9,
        startAt: 5,
        endAt: 13,
        type: 'number',
        name: 'runningNumber',
        description: 'מס רשומה בקובץ',
        fieldId: 1251,
      },
      {
        required: true,
        length: 9,
        startAt: 14,
        endAt: 22,
        type: 'number',
        name: 'business.taxId',
        description: 'מס עוסק מורשה',
        fieldId: 1252,
      },
      {
        required: true,
        length: 3,
        startAt: 23,
        endAt: 25,
        type: 'number',
        name: 'documentType',
        description: 'סוג המסמך',
        fieldId: 1253,
      },
      {
        required: true,
        length: 20,
        startAt: 26,
        endAt: 45,
        type: 'string',
        name: 'documentNumber',
        description: 'מספר המסמך',
        fieldId: 1254,
      },
      {
        required: true,
        length: 4,
        startAt: 46,
        endAt: 49,
        type: 'number',
        name: 'lineNumberInDocument',
        description: 'מספר שורה במסמך',
        fieldId: 1255,
      },
      {
        required: true,
        length: 3,
        startAt: 50,
        endAt: 52,
        type: 'number',
        name: 'documentTypeBase',
        description: 'סוג מסמך בסיס',
        fieldId: 1256,
      },
      {
        required: true,
        length: 20,
        startAt: 53,
        endAt: 72,
        type: 'string',
        name: 'documentNumberBase',
        description: 'מספר מסמך בסיס',
        fieldId: 1257,
      },
      {
        required: true,
        length: 1,
        startAt: 73,
        endAt: 73,
        type: 'number',
        name: 'transactionType',
        description: 'סוג עסקה',
        fieldId: 1258,
      },
      {
        required: false,
        length: 20,
        startAt: 74,
        endAt: 93,
        type: 'string',
        name: 'catalogId',
        description: 'מק"ט פנימי',
        fieldId: 1259,
      },
      {
        required: true,
        length: 30,
        startAt: 94,
        endAt: 123,
        type: 'string',
        name: 'description',
        description: 'תיאור הטובין שנמכר או\nהשירות שניתן',
        fieldId: 1260,
      },
      {
        required: false,
        length: 50,
        startAt: 124,
        endAt: 173,
        type: 'string',
        name: 'manufacturerName',
        description: 'שם היצרן',
        fieldId: 1261,
      },
      {
        required: false,
        length: 30,
        startAt: 174,
        endAt: 203,
        type: 'string',
        name: 'manufacturerSerialNumber',
        description: 'מספר סידורי של המוצר המוטבע על המוצר על ידי\nהיצרן',
        fieldId: 1262,
      },
      {
        default: 'יחידה',
        required: false,
        length: 20,
        startAt: 204,
        endAt: 223,
        type: 'string',
        name: 'unitOfMeasure',
        description: 'תיאור יחידת המידה',
        fieldId: 1263,
      },
      {
        required: true,
        length: 17,
        startAt: 224,
        endAt: 240,
        type: 'positive',
        name: 'quantity',
        description: 'הכמות',
        fieldId: 1264,
      },
      {
        required: true,
        length: 15,
        startAt: 241,
        endAt: 255,
        type: 'positive',
        name: 'unitPriceExcludingVAT',
        description: 'מחיר ליחידה ללא מע"מ',
        fieldId: 1265,
      },
      {
        default: '0',
        required: false,
        length: 15,
        startAt: 256,
        endAt: 270,
        type: 'negative',
        name: 'lineDiscount',
        description: 'הנחת שורה',
        fieldId: 1266,
      },
      {
        required: true,
        length: 15,
        startAt: 271,
        endAt: 285,
        type: 'positive',
        name: 'lineTotal',
        description: 'סך סכום לשורה',
        fieldId: 1267,
      },
      {
        required: true,
        length: 4,
        startAt: 286,
        endAt: 289,
        type: 'number',
        name: 'lineVATRate',
        description: 'שיעור המע"מ בשורה',
        fieldId: 1268,
      },
      {
        required: (input) => !!'TODO', //TODO
        length: 7,
        startAt: 290,
        endAt: 296,
        type: 'string',
        name: 'branchId',
        description: 'מזהה סניף/ענף',
        fieldId: 1270,
      },
      {
        required: true,
        length: 8,
        startAt: 297,
        endAt: 304,
        type: 'number',
        name: 'documentDate',
        description: 'תאריך המסמך',
        fieldId: 1272,
      },
      {
        required: true,
        length: 7,
        startAt: 305,
        endAt: 311,
        type: 'number',
        name: 'linkField',
        description: 'שדה מקשר לכותרת',
        fieldId: 1273,
      },
      {
        required: (input) => !!'TODO', //TODO
        length: 7,
        startAt: 312,
        endAt: 318,
        type: 'string',
        name: 'baseBranchId',
        description: 'מזהה סניף/ענף למסמך\nבסיס',
        fieldId: 1274,
      },
      {
        required: true,
        length: 21,
        startAt: 319,
        endAt: 339,
        type: 'string',
        description: 'שטח לנתונים עתידיים',
        fieldId: 1275,
      },
    ],
  },
  D120Row: {
    cells: [
      {
        default: 'D120',
        required: true,
        length: 4,
        startAt: 1,
        endAt: 4,
        type: 'string',
        name: 'recordCode',
        description: 'קוד רשומה',
        fieldId: 1300,
      },
      {
        required: true,
        length: 9,
        startAt: 5,
        endAt: 13,
        type: 'number',
        name: 'recordNumber',
        description: 'מס רשומה בקובץ',
        fieldId: 1301,
      },
      {
        required: true,
        length: 9,
        startAt: 14,
        endAt: 22,
        type: 'number',
        name: 'business.taxId',
        description: 'מס עוסק מורשה',
        fieldId: 1302,
      },
      {
        required: true,
        length: 3,
        startAt: 23,
        endAt: 25,
        type: 'number',
        name: 'documentType',
        description: 'סוג מסמך',
        fieldId: 1303,
      },
      {
        required: true,
        length: 20,
        startAt: 26,
        endAt: 45,
        type: 'string',
        name: 'documentNumber',
        description: 'מספר מסמך',
        fieldId: 1304,
      },
      {
        required: true,
        length: 4,
        startAt: 46,
        endAt: 49,
        type: 'number',
        name: 'lineNumberInDocument',
        description: 'מספר שורה במסמך',
        fieldId: 1305,
      },
      {
        required: true,
        length: 1,
        startAt: 50,
        endAt: 50,
        type: 'number',
        name: 'paymentMethod',
        description: 'סוג אמצעי התשלום',
        fieldId: 1306,
      },
      {
        required: (input) => !(('TODO' as any) === PaymentMethod.CHECK), //TODO
        length: 10,
        startAt: 51,
        endAt: 60,
        type: 'number',
        name: 'bankId',
        description: 'מספר הבנק',
        fieldId: 1307,
      },
      {
        required: (input) => !(('TODO' as any) === PaymentMethod.CHECK), //TODO
        length: 10,
        startAt: 61,
        endAt: 70,
        type: 'number',
        name: 'branchId',
        description: 'מספר הסניף',
        fieldId: 1308,
      },
      {
        required: (input) => !(('TODO' as any) === PaymentMethod.CHECK), //TODO
        length: 15,
        startAt: 71,
        endAt: 85,
        type: 'number',
        name: 'accountNumber',
        description: 'מספר חשבון',
        fieldId: 1309,
      },
      {
        required: (input) => !(('TODO' as any) === PaymentMethod.CHECK), //TODO
        length: 10,
        startAt: 86,
        endAt: 95,
        type: 'number',
        name: 'checkNumber',
        description: 'מספר המחאה',
        fieldId: 1310,
      },
      {
        required: (input) =>
          !(
            ('TODO' as any) === PaymentMethod.CHECK || PaymentMethod.CREDIT_CARD
          ), //TODO
        length: 8,
        startAt: 96,
        endAt: 103,
        type: 'number',
        name: 'paymentDueDate',
        description: 'תאריך הפירעון של ההמחאה /\nהתשלום',
        fieldId: 1311,
      },
      {
        required: true,
        length: 15,
        startAt: 104,
        endAt: 118,
        type: 'positive',
        name: 'amount',
        description: 'סכום השורה',
        fieldId: 1312,
      },
      {
        required: (input) => !(('any' as any) === PaymentMethod.CREDIT_CARD), // todo
        length: 1,
        startAt: 119,
        endAt: 119,
        type: 'number',
        name: 'creditCardCompany',
        description: 'קוד החברה הסולקת',
        fieldId: 1313,
      },
      {
        required: (input) => !(('any' as any) === PaymentMethod.CREDIT_CARD), // todo
        length: 20,
        startAt: 120,
        endAt: 139,
        type: 'string',
        name: 'creditCardName',
        description: 'שם הכרטיס הנסלק',
        fieldId: 1314,
      },
      {
        required: (input) => !(('any' as any) === PaymentMethod.CREDIT_CARD), // todo
        length: 1,
        startAt: 140,
        endAt: 140,
        type: 'number',
        name: 'creditCardTransactionType',
        description: 'סוג עסקת האשראי',
        fieldId: 1315,
      },
      {
        required: false,
        length: 7,
        startAt: 141,
        endAt: 147,
        type: 'string',
        name: 'branchId',
        description: 'מזהה סניף/ענף',
        fieldId: 1320,
      },
      {
        required: true,
        length: 8,
        startAt: 148,
        endAt: 155,
        type: 'number',
        name: 'documentDate',
        description: 'תאריך המסמך',
        fieldId: 1322,
      },
      {
        required: true,
        length: 7,
        startAt: 156,
        endAt: 162,
        type: 'number',
        name: 'linkField',
        description: 'שדה מקשר לכותרת',
        fieldId: 1323,
      },
      {
        required: true,
        length: 60,
        startAt: 163,
        endAt: 222,
        type: 'string',
        description: 'שטח לנתונים עתידיים',
        fieldId: 1324,
      },
    ],
  },
  B100Row: {
    cells: [
      {
        default: 'B100',
        required: true,
        length: 4,
        startAt: 1,
        endAt: 4,
        type: 'string',
        description: 'קוד רשומה',
        fieldId: 1350,
      },
      {
        default: 'מס רץ של הרשומה בקובץ BKMVDATA',
        required: true,
        length: 9,
        startAt: 5,
        endAt: 13,
        type: 'number',
        description: 'מס רשומה בקובץ',
        fieldId: 1351,
      },
      {
        default: 'מספר עוסק מורשה של בית העסק',
        required: true,
        length: 9,
        startAt: 14,
        endAt: 22,
        type: 'number',
        description: 'מס עוסק מורשה',
        fieldId: 1352,
      },
      {
        default: 'ראה הבהרה 7 בנספח הבהרות.',
        required: true,
        length: 10,
        startAt: 23,
        endAt: 32,
        type: 'number',
        description: 'מספר תנועה',
        fieldId: 1353,
      },
      {
        required: true,
        length: 5,
        startAt: 33,
        endAt: 37,
        type: 'number',
        description: 'מספר שורה בתנועה',
        fieldId: 1354,
      },
      {
        required: true,
        length: 8,
        startAt: 38,
        endAt: 45,
        type: 'number',
        description: 'מנה',
        fieldId: 1355,
      },
      {
        required: true,
        length: 15,
        startAt: 46,
        endAt: 60,
        type: 'string',
        description: 'סוג תנועה',
        fieldId: 1356,
      },
      {
        default:
          'בהתאם לטבלת עזר המפורטת בנספח מספר .1 אם רישום האסמכתא הוא תוצר של תהליך\nמובנה בתוכנה ולכן סוג המסמך ידוע.',
        required: true,
        length: 20,
        startAt: 61,
        endAt: 80,
        type: 'string',
        description: 'אסמכתא',
        fieldId: 1357,
      },
      {
        required: true,
        length: 3,
        startAt: 81,
        endAt: 83,
        type: 'number',
        description: 'סוג מסמך האסמכתא',
        fieldId: 1358,
      },
      {
        default:
          'בהתאם לטבלת עזר המפורטת בנספח מספר .1 אם רישום האסמכתא הוא תוצר של תהליך\nמובנה בתוכנה ולכן סוג המסמך ידוע.',
        required: true,
        length: 20,
        startAt: 84,
        endAt: 103,
        type: 'string',
        description: 'אסמכתא 2',
        fieldId: 1359,
      },
      {
        required: true,
        length: 3,
        startAt: 104,
        endAt: 106,
        type: 'number',
        description: 'סוג מסמך האסמכתא\n2',
        fieldId: 1360,
      },
      {
        required: true,
        length: 50,
        startAt: 107,
        endAt: 156,
        type: 'string',
        description: 'פרטים',
        fieldId: 1361,
      },
      {
        default: 'בפורמט ,YYYYMMDD ראה הבהרה 12\nבנספח הבהרות',
        required: true,
        length: 8,
        startAt: 157,
        endAt: 164,
        type: 'number',
        description: 'תאריך',
        fieldId: 1362,
      },
      {
        default: 'בפורמט ,YYYYMMDD ראה הבהרה 12\nבנספח הבהרות',
        required: true,
        length: 8,
        startAt: 165,
        endAt: 172,
        type: 'number',
        description: 'תאריך ערך',
        fieldId: 1363,
      },
      {
        default: 'מפתח החשבון; לערך שדה זה חייבת להיות\nרשומה מסוג B110',
        required: true,
        length: 15,
        startAt: 173,
        endAt: 187,
        type: 'string',
        description: 'חשבון בתנועה',
        fieldId: 1364,
      },
      {
        default:
          'מפתח החשבון . בהנהלת חשבונות חד צידית בלבד, אם קיים. לערך שדה זה חייבת להיות\nרשומה מסוג B110',
        required: true,
        length: 15,
        startAt: 188,
        endAt: 202,
        type: 'string',
        description: 'חשבון נגדי',
        fieldId: 1365,
      },
      {
        default: '1 - חובה, הוצאה; 2 - זכות, הכנסה',
        required: true,
        length: 1,
        startAt: 203,
        endAt: 203,
        type: 'number',
        description: 'סימן הפעולה',
        fieldId: 1366,
      },
      {
        default:
          'בהתאם לטבלת קוד מטבע בנספח מספר .2 מתייחס לסכום המופיע בשדה 1369',
        required: true,
        length: 3,
        startAt: 204,
        endAt: 206,
        type: 'string',
        description: 'קוד מטבע מטח',
        fieldId: 1367,
      },
      {
        default: 'במטבע מוביל',
        required: true,
        length: 15,
        startAt: 207,
        endAt: 221,
        type: 'string',
        description: 'סכום הפעולה',
        fieldId: 1368,
      },
      {
        required: true,
        length: 15,
        startAt: 222,
        endAt: 236,
        type: 'string',
        description: 'סכום מטח',
        fieldId: 1369,
      },
      {
        default: 'עשוי לשמש לדוגמא לציון כמות ע"נ או קוד\nתמחיר',
        required: true,
        length: 12,
        startAt: 237,
        endAt: 248,
        type: 'string',
        description: 'שדה כמות',
        fieldId: 1370,
      },
      {
        default: 'מספר זיהוי להתאמת שורות בתוך כרטיס,\nלמשל התאמת עסקת חו"ז.',
        required: true,
        length: 10,
        startAt: 249,
        endAt: 258,
        type: 'string',
        description: 'שדה התאמה 1',
        fieldId: 1371,
      },
      {
        default:
          'מספר זיהוי להתאמת שורות בכרטיס לשורות בכרטיס אחר או כרטיס חיצוני, למשל התאמת\nבנק.',
        required: true,
        length: 10,
        startAt: 259,
        endAt: 268,
        type: 'string',
        description: 'שדה התאמה 2',
        fieldId: 1372,
      },
      {
        default: 'שדה מבוטל!',
        required: true,
        length: 0,
        startAt: 269,
        endAt: 269,
        type: 'string',
        description: 'שטח לנתונים \nעתידיים',
        fieldId: 1373,
      },
      {
        default:
          'מספר הסניף/הענף כפי שמופיע ברישומי בית\nהעסק; חובה כאשר ערכו של שדה 1034 הוא ,1\nראה הבהרה 3 בנספח הבהרות',
        required: true,
        length: 7,
        startAt: 269,
        endAt: 275,
        type: 'string',
        description: 'מזהה סניף/ענף',
        fieldId: 1374,
      },
      {
        default: 'ראה הבהרה מספר 12 בנספח ההבהרות',
        required: true,
        length: 8,
        startAt: 276,
        endAt: 283,
        type: 'number',
        description: 'תאריך הזנה',
        fieldId: 1375,
      },
      {
        default: 'שם המשתמש של מבצע הפעולה',
        required: true,
        length: 9,
        startAt: 284,
        endAt: 292,
        type: 'string',
        description: 'מבצע פעולה',
        fieldId: 1376,
      },
      {
        required: true,
        length: 25,
        startAt: 293,
        endAt: 317,
        type: 'string',
        description: 'שטח לנתונים עתידיים',
        fieldId: 1377,
      },
    ],
  },
  B110Row: {
    cells: [
      {
        default: 'B110',
        required: true,
        length: 4,
        startAt: 1,
        endAt: 4,
        type: 'string',
        description: 'קוד רשומה',
        fieldId: 1400,
      },
      {
        default: 'מס רץ של הרשומה בקובץ\nBKMVDATA',
        required: true,
        length: 9,
        startAt: 5,
        endAt: 13,
        type: 'number',
        description: 'מס רשומה בקובץ',
        fieldId: 1401,
      },
      {
        default: 'מספר עוסק מורשה של בית העסק',
        required: true,
        length: 9,
        startAt: 14,
        endAt: 22,
        type: 'number',
        description: 'מס עוסק מורשה',
        fieldId: 1402,
      },
      {
        default: 'ערך השדה חד חד ערכי',
        required: true,
        length: 15,
        startAt: 23,
        endAt: 37,
        type: 'string',
        description: 'מפתח החשבון',
        fieldId: 1403,
      },
      {
        required: true,
        length: 50,
        startAt: 38,
        endAt: 87,
        type: 'string',
        description: 'שם החשבון',
        fieldId: 1404,
      },
      {
        required: true,
        length: 15,
        startAt: 88,
        endAt: 102,
        type: 'string',
        description: 'קוד מאזן בוחן',
        fieldId: 1405,
      },
      {
        required: true,
        length: 30,
        startAt: 103,
        endAt: 132,
        type: 'string',
        description: 'תיאור קוד מאזן בוחן',
        fieldId: 1406,
      },
      {
        default: 'ברשומת חשבון של לקוח או ספק',
        required: true,
        length: 50,
        startAt: 133,
        endAt: 182,
        type: 'string',
        description: 'מען הלקוח/ספק - רחוב',
        fieldId: 1407,
      },
      {
        default: 'ברשומת חשבון של לקוח או ספק',
        required: true,
        length: 10,
        startAt: 183,
        endAt: 192,
        type: 'string',
        description: 'מען הלקוח/ספק - מספר בית',
        fieldId: 1408,
      },
      {
        default: 'ברשומת חשבון של לקוח או ספק',
        required: true,
        length: 30,
        startAt: 193,
        endAt: 222,
        type: 'string',
        description: 'מען הלקוח/ספק - עיר',
        fieldId: 1409,
      },
      {
        default: 'ברשומת חשבון של לקוח או ספק',
        required: true,
        length: 8,
        startAt: 223,
        endAt: 230,
        type: 'string',
        description: 'מען הלקוח/ספק - מיקוד',
        fieldId: 1410,
      },
      {
        default: 'ברשומת חשבון של לקוח או ספק',
        required: true,
        length: 30,
        startAt: 231,
        endAt: 260,
        type: 'string',
        description: 'מען הלקוח/ספק - מדינה',
        fieldId: 1411,
      },
      {
        default: 'ברשומת חשבון של לקוח או ספק',
        required: true,
        length: 2,
        startAt: 261,
        endAt: 262,
        type: 'string',
        description: 'קוד מדינה',
        fieldId: 1412,
      },
      {
        required: true,
        length: 15,
        startAt: 263,
        endAt: 277,
        type: 'string',
        description: 'חשבון מרכז',
        fieldId: 1413,
      },
      {
        default:
          'שדה מחושב לפי תאריך החיתוך של\nהנתונים ) "+" - יתרת חובה; "-" -\nיתרת זכות (',
        required: true,
        length: 15,
        startAt: 278,
        endAt: 292,
        type: 'string',
        description: 'יתרת החשבון בתחילת החתך',
        fieldId: 1414,
      },
      {
        default: 'סך כספי של תנועות החובה ללא\nיתרת פתיחה',
        required: true,
        length: 15,
        startAt: 293,
        endAt: 307,
        type: 'string',
        description: 'סה"כ חובה',
        fieldId: 1415,
      },
      {
        default: 'סך כספי של תנועות הזכות ללא\nיתרת פתיחה',
        required: true,
        length: 15,
        startAt: 308,
        endAt: 322,
        type: 'string',
        description: 'סה"כ זכות',
        fieldId: 1416,
      },
      {
        default: 'בהתאם לטופס ;6111 חובה כאשר הנישום חייב בדיווח כזה',
        required: true,
        length: 4,
        startAt: 323,
        endAt: 326,
        type: 'number',
        description: 'קוד בסיווג החשבונאי',
        fieldId: 1417,
      },
      {
        default:
          'ציון מספר עוסק מורשה של הספק\nחובה אם הנישום מנהל הנהלת חשבונות כפולה )קוד 2 בשדה 1013\n.(',
        required: true,
        length: 9,
        startAt: 327,
        endAt: 335,
        type: 'number',
        description: 'מספר עוסק של ספק/לקוח',
        fieldId: 1419,
      },
      {
        default:
          'מספר הסניף/ענף כפי שמופיע ברישומי בית העסק; חובה כאשר ערכו של שדה 1034 הוא 1 , ראה הבהרה 3 בנספח\nהבהרות',
        required: true,
        length: 7,
        startAt: 336,
        endAt: 342,
        type: 'string',
        description: 'מזהה סניף/ענף',
        fieldId: 1421,
      },
      {
        required: true,
        length: 15,
        startAt: 343,
        endAt: 357,
        type: 'string',
        description: 'יתרת חשבון בתחילת חתך\nבמט"ח',
        fieldId: 1422,
      },
      {
        default:
          'בהתאם לטבלת קוד מטבע בנספח מספר .2 מתייחס לסכום המופיע\nבשדה 1422',
        required: true,
        length: 3,
        startAt: 358,
        endAt: 360,
        type: 'string',
        description: 'קוד מטבע יתרת החשבון בתחילת חתך במט"ח',
        fieldId: 1423,
      },
      {
        required: true,
        length: 16,
        startAt: 361,
        endAt: 376,
        type: 'string',
        description: 'שטח לנתונים עתידיים',
        fieldId: 1424,
      },
    ],
  },
  M100Row: {
    cells: [
      {
        default: 'M100',
        required: true,
        length: 4,
        startAt: 1,
        endAt: 4,
        type: 'string',
        description: 'קוד רשומה',
        fieldId: 1450,
      },
      {
        default: 'מס רץ של הרשומה בקובץ\nBKMVDATA',
        required: true,
        length: 9,
        startAt: 5,
        endAt: 13,
        type: 'number',
        description: 'מס רשומה בקובץ',
        fieldId: 1451,
      },
      {
        default: 'מספר עוסק מורשה של בית העסק',
        required: true,
        length: 9,
        startAt: 14,
        endAt: 22,
        type: 'number',
        description: 'מס עוסק מורשה',
        fieldId: 1452,
      },
      {
        required: true,
        length: 20,
        startAt: 23,
        endAt: 42,
        type: 'string',
        description: 'מק"ט פריט אוניברסלי',
        fieldId: 1453,
      },
      {
        required: true,
        length: 20,
        startAt: 43,
        endAt: 62,
        type: 'string',
        description: 'מק"ט הספק/יצרן ) במסמכי רכש (',
        fieldId: 1454,
      },
      {
        default: 'ערך השדה חד חד ערכי',
        required: true,
        length: 20,
        startAt: 63,
        endAt: 82,
        type: 'string',
        description: 'מק"ט פנימי',
        fieldId: 1455,
      },
      {
        required: true,
        length: 50,
        startAt: 83,
        endAt: 132,
        type: 'string',
        description: 'שם פריט',
        fieldId: 1456,
      },
      {
        required: true,
        length: 10,
        startAt: 133,
        endAt: 142,
        type: 'string',
        description: 'קוד מיון',
        fieldId: 1457,
      },
      {
        required: true,
        length: 30,
        startAt: 143,
        endAt: 172,
        type: 'string',
        description: 'תיאור קוד מיון',
        fieldId: 1458,
      },
      {
        default:
          'כשמדובר ביחידה עם משמעות )לדוגמא : ליטר, גרם, שעת עבודה( ירשם תיאור היחידה, אחרת תרשם\nהמילה "יחידה',
        required: true,
        length: 20,
        startAt: 173,
        endAt: 192,
        type: 'string',
        description: 'תיאור יחידת מידה',
        fieldId: 1459,
      },
      {
        default: 'בכל המחסנים',
        required: true,
        length: 12,
        startAt: 193,
        endAt: 204,
        type: 'string',
        description: 'יתרת הפריט לתחילת\nהחתך',
        fieldId: 1460,
      },
      {
        default: 'סך הכניסות בטווח , ללא יתרת פתיחה',
        required: true,
        length: 12,
        startAt: 205,
        endAt: 216,
        type: 'string',
        description: 'סך הכל כניסות',
        fieldId: 1461,
      },
      {
        default: 'סך היציאות בטווח , ללא יתרת פתיחה',
        required: true,
        length: 12,
        startAt: 217,
        endAt: 228,
        type: 'string',
        description: 'סך הכל יציאות',
        fieldId: 1462,
      },
      {
        default: 'סכום בש"ח, ראה הבהרה 9 בנספח\nהבהרות',
        required: true,
        length: 10,
        startAt: 229,
        endAt: 238,
        type: 'number',
        description: 'מחיר עלות במלאי לסוף תקופת החתך מחוץ למחסני ערובה',
        fieldId: 1463,
      },
      {
        default: 'סכום בש"ח, ראה הבהרה 10 בנספח\nהבהרות',
        required: true,
        length: 10,
        startAt: 239,
        endAt: 248,
        type: 'number',
        description: 'מחיר עלות במלאי לסוף תקופת החתך במחסני\nערובה',
        fieldId: 1464,
      },
      {
        required: true,
        length: 50,
        startAt: 249,
        endAt: 298,
        type: 'string',
        description: 'שטח לנתונים עתידיים',
        fieldId: 1465,
      },
    ],
  },
}
