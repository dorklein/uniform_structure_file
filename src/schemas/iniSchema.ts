import { INISchema, Row, SoftwareType } from '../types'
import {
  isOptionalValidDate,
  isValidDate,
  isValidSSN,
} from '../utils/validators'

const header: Row = {
  cells: [
    {
      fieldId: 1000,
      name: 'recordCode',
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
      name: 'forFutureData',
      description: 'לשימוש עתידי',
      type: 'string',
      length: 5,
      startAt: 5,
      endAt: 9,
      required: false,
    },
    {
      fieldId: 1002,
      name: 'numberOfRowsInBKMVDATA',
      description: 'סך רשומות בקובץ BKMVDATA',
      type: 'number',
      length: 15,
      startAt: 10,
      endAt: 24,
      required: true,
    },
    {
      fieldId: 1003,
      name: 'business.taxId',
      description: 'מספר עוסק מורשה',
      type: 'number',
      length: 9,
      startAt: 25,
      endAt: 33,
      required: true,
      validator: isValidSSN,
    },
    {
      fieldId: 1004,
      name: 'uuid',
      description: 'מזהה ראשי',
      type: 'number',
      length: 15,
      startAt: 34,
      endAt: 48,
      required: true,
    },
    {
      fieldId: 1005,
      name: 'systemConstant',
      description: 'קבוע מערכת',
      type: 'string',
      length: 8,
      startAt: 49,
      endAt: 56,
      required: true,
      default: '&OF1.31&',
    },
    {
      fieldId: 1006,
      name: 'software.registrationNumber',
      description: 'מספר רישום התוכנה',
      type: 'number',
      length: 8,
      startAt: 57,
      endAt: 64,
      required: true,
    },
    {
      fieldId: 1007,
      name: 'software.name',
      description: 'שם התוכנה',
      type: 'string',
      length: 20,
      startAt: 65,
      endAt: 84,
      required: true,
    },
    {
      fieldId: 1008,
      name: 'software.version',
      description: 'מהדורת התוכנה',
      type: 'string',
      length: 20,
      startAt: 85,
      endAt: 104,
      required: true,
    },
    {
      fieldId: 1009,
      name: 'software.companyTaxId',
      description: 'מספר ע"מ של יצרן התוכנה',
      type: 'number',
      length: 9,
      startAt: 105,
      endAt: 113,
      required: true,
      validator: isValidSSN,
    },
    {
      fieldId: 1010,
      name: 'software.companyName',
      description: 'שם יצרן התוכנה',
      type: 'string',
      length: 20,
      startAt: 114,
      endAt: 133,
      required: true,
    },
    {
      fieldId: 1011,
      name: 'software.type',
      description: 'סוג התוכנה',
      type: 'number', // 1= חד שנתי, 2 = רב שנתי
      length: 1,
      startAt: 134,
      endAt: 134,
      required: true,
    },
    {
      fieldId: 1012,
      name: 'dirPath',
      description: 'נתיב מיקום שמירת הקבצים',
      type: 'string',
      length: 50,
      startAt: 135,
      endAt: 184,
      required: true,
    },
    {
      fieldId: 1013,
      name: 'software.accountingType',
      description: 'סוג הנהח"ש של התוכנה',
      type: 'number', // 0=לא רלוונטי, 1=חד צידית, 2=כפולה.
      length: 1,
      startAt: 185,
      endAt: 185,
      required: true,
    },
    {
      fieldId: 1014,
      name: 'requiredAccountingBalance',
      description: 'איזון חשבונאי נדרש',
      type: 'number', // 1=רמת התנועה, 2=רמת המנה. בהנהלת חשבונות כפולה חובה
      length: 1,
      startAt: 186,
      endAt: 186,
      required: false,
      default: 1,
    },
    {
      fieldId: 1015,
      name: 'business.companyId',
      description: 'מספר חברה ברשם החברות',
      type: 'number',
      length: 9,
      startAt: 187,
      endAt: 195,
      required: false,
      validator: isOptionalValidDate,
    },
    {
      fieldId: 1016,
      name: 'DeductionFileID',
      description: 'מספר תיק ניכויים',
      type: 'number',
      length: 9,
      startAt: 196,
      endAt: 204,
      required: false,
    },
    {
      fieldId: 1017,
      name: 'forFutureData',
      description: 'שטח נתונים עתידי',
      type: 'string',
      length: 10,
      startAt: 205,
      endAt: 214,
      required: false,
    },
    {
      fieldId: 1018,
      name: 'business.name',
      description: 'שם העסק',
      type: 'string',
      length: 50,
      startAt: 215,
      endAt: 264,
      required: true,
    },
    {
      fieldId: 1019,
      name: 'business.address.street',
      description: 'מען העסק - רחוב',
      type: 'string',
      length: 50,
      startAt: 265,
      endAt: 314,
      required: false,
    },
    {
      fieldId: 1020,
      name: 'business.address.houseNumber',
      description: 'מען העסק - מס בית',
      type: 'string',
      length: 10,
      startAt: 315,
      endAt: 324,
      required: false,
    },
    {
      fieldId: 1021,
      name: 'business.address.city',
      description: 'מען העסק - עיר',
      type: 'string',
      length: 30,
      startAt: 325,
      endAt: 354,
      required: false,
    },
    {
      fieldId: 1022,
      name: 'business.address.zipCode',
      description: 'מען העסק - מיקוד',
      type: 'string',
      length: 8,
      startAt: 355,
      endAt: 362,
      required: false,
    },
    {
      fieldId: 1023,
      name: 'taxYear',
      description: 'שנת המס',
      type: 'number',
      length: 4,
      startAt: 363,
      endAt: 366,
      required: (input) =>
        input.software.type === SoftwareType.SINGLE_YEAR &&
        `taxYear is required when software.type is ${SoftwareType.SINGLE_YEAR}`,
    },
    {
      fieldId: 1024,
      name: 'dataRangeStartDate',
      description: 'טווח נתונים - תאריך התחלה/חיתוך',
      type: 'date',
      length: 8,
      startAt: 367,
      endAt: 374,
      required: (input) =>
        input.software.type === SoftwareType.MULTI_YEAR &&
        `dataRangeEndDate is required when software.type is ${SoftwareType.MULTI_YEAR}`,
      validator: isOptionalValidDate,
    },
    {
      fieldId: 1025,
      name: 'dataRangeEndDate',
      description: 'טווח נתונים - תאריך סיום/חיתוך',
      type: 'date',
      length: 8,
      startAt: 375,
      endAt: 382,
      required: (input) =>
        input.software.type === SoftwareType.MULTI_YEAR &&
        `dataRangeEndDate is required when software.type is ${SoftwareType.MULTI_YEAR}`,
      validator: isOptionalValidDate,
    },
    {
      fieldId: 1026,
      name: 'processStartDate',
      description: 'תאריך תחילת התהליך',
      type: 'date', // YYYYMMDD
      length: 8,
      startAt: 383,
      endAt: 390,
      required: true,
      validator: isValidDate,
    },
    {
      fieldId: 1027,
      name: 'processStartTime',
      description: 'שעת התחלת התהליך',
      type: 'time', // HHMM
      length: 4,
      startAt: 391,
      endAt: 394,
      required: true,
    },
    /**
     * 0 - עברית
     * 1 - ערבית
     * 2 - אחר
     */
    {
      fieldId: 1028,
      name: 'languageCode',
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
      name: 'encoding',
      description: 'סט תוים',
      type: 'number', // -862CP = 2; i-8859-8-ISO =1
      length: 1,
      startAt: 396,
      endAt: 396,
      required: true,
      default: 1,
    },
    {
      fieldId: 1030,
      name: 'compressionSoftware',
      description: 'שם תוכנת הכיווץ',
      type: 'string',
      length: 20,
      startAt: 397,
      endAt: 416,
      required: true,
    },
    {
      fieldId: 1032,
      name: 'leadingCurrency',
      description: 'מטבע מוביל',
      type: 'string',
      length: 3,
      startAt: 417,
      endAt: 419,
      required: true,
      default: 'ILS',
    },
    /**
     * 1 - בעסק יש סניפים /ענפים
     * 0 - בעסק  סניפים . ראה הבהרה 3 בנספח
     * הבהרות.
     */
    {
      fieldId: 1034,
      name: 'business.hasBranches',
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
      name: 'forFutureData',
      description: 'שטח לנתונים עתידיים',
      type: 'string',
      length: 46,
      startAt: 421,
      endAt: 466,
      required: false,
    },
  ],
}
const summaryRow: Row = {
  cells: [
    {
      fieldId: 1050,
      name: 'recordCode',
      description: 'קוד רשומה',
      type: 'string',
      length: 4,
      startAt: 1,
      endAt: 4,
      required: true,
    },
    {
      fieldId: 1051,
      name: 'recordsCount',
      description: 'סך רשומות',
      type: 'number',
      length: 15,
      startAt: 5,
      endAt: 19,
      required: true,
    },
  ],
}

export const iniSchema: INISchema = {
  header,
  summaryRow,
}
