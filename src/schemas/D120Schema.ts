import { DocumentPayment, HasBranches, PaymentMethod, Row } from '../types'

const requiredWhen = (fieldId: number, fieldName: string, when: string) => {
  return `[${fieldId}:${fieldName}] is required when ${when}`
}
const requiredWhenCheck = (fieldId: number, fieldName: string) => {
  return requiredWhen(
    fieldId,
    fieldName,
    'paymentMethod is PaymentMethod.CHECK'
  )
}

const requiredWhenCreditCard = (fieldId: number, fieldName: string) => {
  return requiredWhen(
    fieldId,
    fieldName,
    'paymentMethod is PaymentMethod.CREDIT_CARD'
  )
}

const requiredWhenCheckOrCreditCard = (fieldId: number, fieldName: string) => {
  return requiredWhen(
    fieldId,
    fieldName,
    'paymentMethod is PaymentMethod.CHECK or PaymentMethod.CREDIT_CARD'
  )
}

export const D120Schema: Row<DocumentPayment> = {
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
      name: 'runningNumber',
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
      name: 'lineNumber',
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
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CHECK
          ? requiredWhenCheck(1307, 'bankId')
          : false,
      length: 10,
      startAt: 51,
      endAt: 60,
      type: 'number',
      name: 'bankId',
      description: 'מספר הבנק',
      fieldId: 1307,
    },
    {
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CHECK
          ? requiredWhenCheck(1308, 'branchId')
          : false,
      length: 10,
      startAt: 61,
      endAt: 70,
      type: 'number',
      name: 'branchId',
      description: 'מספר הסניף',
      fieldId: 1308,
    },
    {
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CHECK
          ? requiredWhenCheck(1309, 'accountNumber')
          : false,
      length: 15,
      startAt: 71,
      endAt: 85,
      type: 'number',
      name: 'accountNumber',
      description: 'מספר חשבון',
      fieldId: 1309,
    },
    {
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CHECK
          ? requiredWhenCheck(1310, 'checkNumber')
          : false,
      length: 10,
      startAt: 86,
      endAt: 95,
      type: 'number',
      name: 'checkNumber',
      description: 'מספר המחאה',
      fieldId: 1310,
    },
    {
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CHECK ||
        item.paymentMethod === PaymentMethod.CREDIT_CARD
          ? requiredWhenCheckOrCreditCard(1311, 'paymentDueDate')
          : false,
      length: 8,
      startAt: 96,
      endAt: 103,
      type: 'date',
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
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CREDIT_CARD
          ? requiredWhenCreditCard(1313, 'creditCardCompany')
          : false,
      length: 1,
      startAt: 119,
      endAt: 119,
      type: 'number',
      name: 'creditCardCompany',
      description: 'קוד החברה הסולקת',
      fieldId: 1313,
    },
    {
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CREDIT_CARD
          ? requiredWhenCreditCard(1314, 'creditCardName')
          : false,
      length: 20,
      startAt: 120,
      endAt: 139,
      type: 'string',
      name: 'creditCardName',
      description: 'שם הכרטיס הנסלק',
      fieldId: 1314,
    },
    {
      required: (input, item) =>
        item.paymentMethod === PaymentMethod.CREDIT_CARD
          ? requiredWhenCreditCard(1315, 'creditCardTransactionType')
          : false,
      length: 1,
      startAt: 140,
      endAt: 140,
      type: 'number',
      name: 'creditCardTransactionType',
      description: 'סוג עסקת האשראי',
      fieldId: 1315,
    },
    {
      required: (input) => input.business.hasBranches === HasBranches.YES,
      length: 7,
      startAt: 141,
      endAt: 147,
      type: 'string',
      name: 'business.branchId',
      description: 'מזהה סניף/ענף',
      fieldId: 1320,
    },
    {
      required: true,
      length: 8,
      startAt: 148,
      endAt: 155,
      type: 'date',
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
      required: false,
      length: 60,
      startAt: 163,
      endAt: 222,
      type: 'string',
      name: 'forFutureData',
      description: 'שטח לנתונים עתידיים',
      fieldId: 1324,
    },
  ],
}
