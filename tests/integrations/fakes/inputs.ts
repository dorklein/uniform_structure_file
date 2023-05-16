import {
  BusinessData,
  CreditCardCompany,
  CreditCardTransactionType,
  CustomerOrVendor,
  DocumentItem,
  DocumentPayment,
  DocumentRecord,
  DocumentType,
  FileEncoding,
  HasBranches,
  LanguageCode,
  PaymentMethod,
  SoftwareAccountingType,
  SoftwareData,
  SoftwareType,
  TransactionType,
  UniformStructureInput,
} from '../../../src/types'
import { faker } from '@faker-js/faker'
import { getCheckDigit } from '../../../src/utils/ssnValidator'

function fakeSSN(): number {
  const val = faker.helpers.replaceSymbolWithNumber('########')
  return +(val + getCheckDigit(val))
}
function fakeSoftware(): SoftwareData {
  return {
    registrationNumber: faker.number.int(99999999),
    name: faker.company.name().slice(0, 20),
    version: faker.string.numeric({ length: { min: 1, max: 20 } }),
    companyTaxId: fakeSSN(),
    companyName: faker.company.name().slice(0, 20),
    type: faker.helpers.enumValue(SoftwareType),
    accountingType: faker.helpers.enumValue(SoftwareAccountingType),
  }
}

function fakeBusiness(): BusinessData {
  const hasBranches = faker.helpers.enumValue(HasBranches)
  return {
    taxId: fakeSSN(),
    companyId: fakeSSN(),
    name: faker.person.fullName(),
    address: {
      street: faker.location.street(),
      houseNumber: faker.string.numeric({
        allowLeadingZeros: true,
        length: { min: 1, max: 10 },
      }),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
    },
    hasBranches: hasBranches,
    branchId:
      hasBranches === HasBranches.YES
        ? faker.string.alphanumeric({ length: { min: 1, max: 7 } })
        : undefined,
  }
}
function fakeCustomerOrVendor(): CustomerOrVendor {
  return {
    name: faker.person.fullName(),
    key: faker.string.alphanumeric(),
    taxId: fakeSSN(),
    phone: faker.phone.number('05#-#######'),
  }
}

function fakeItem(): DocumentItem {
  return {
    lineNumber: faker.number.int({ min: 1, max: 9999 }),
    transactionType: faker.helpers.enumValue(TransactionType),
    // catalogId?: string
    description: faker.string.sample({ min: 1, max: 30 }),
    // manufacturerName?: string
    // manufacturerSerialNumber?: string
    // unitOfMeasure?: string
    quantity: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 16 },
    }),
    unitPriceExcludingVAT: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 14 },
    }),
    // lineDiscount?: string
    lineTotal: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 14 },
    }),
    lineVATRate: faker.number.int(4),
  }
}

function fakePayment(): DocumentPayment {
  const paymentMethod = faker.helpers.enumValue(PaymentMethod)
  const isCheck = paymentMethod === PaymentMethod.CHECK
  const isCheckOrCredit = [
    PaymentMethod.CHECK,
    PaymentMethod.CREDIT_CARD,
  ].includes(paymentMethod)
  const isCredit = paymentMethod === PaymentMethod.CREDIT_CARD

  return {
    lineNumber: faker.number.int({ min: 1, max: 9999 }),
    paymentMethod,
    bankId: isCheck ? faker.number.int({ min: 1, max: 10 }) : undefined,
    branchId: isCheck ? faker.number.int({ min: 1, max: 10 }) : undefined,
    accountNumber: isCheck ? faker.number.int({ min: 1, max: 15 }) : undefined,
    checkNumber: isCheck ? faker.number.int({ min: 1, max: 10 }) : undefined,
    paymentDueDate: isCheckOrCredit ? faker.date.past() : undefined,
    amount: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 14 },
    }),
    creditCardCompany: isCredit
      ? faker.helpers.enumValue(CreditCardCompany)
      : undefined,
    creditCardName: isCredit ? faker.person.fullName() : undefined,
    creditCardTransactionType: isCredit
      ? faker.helpers.enumValue(CreditCardTransactionType)
      : undefined,
  }
}

function fakeDocument(): DocumentRecord {
  return {
    documentType: faker.helpers.enumValue(DocumentType),
    documentNumber: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 20 },
    }),
    documentCreationDate: faker.date.past(),
    documentCreationTime: faker.date.past(),
    customerOrVendor: fakeCustomerOrVendor(),
    documentDate: faker.date.past(),
    valueDate: faker.date.past(),
    // finalSumInForeignCurrency?: number
    // currencyCode?: string
    documentSumBeforeDiscount: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 14 },
    }),
    // discount?: string
    documentSumAfterDiscountExcludingVat: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 14 },
    }),
    vatSum: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 14 },
    }),
    documentSumIncludingVat: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 14 },
    }),
    deductionAtSourceSum: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 11 },
    }),
    linkField: '1234',
    isCanceled: faker.number.binary().toString(),

    // D110
    items: [fakeItem(), fakeItem()],

    // D120
    payments: [fakePayment(), fakePayment(), fakePayment(), fakePayment()],
  }
}
export function createFakeInput(): UniformStructureInput {
  faker.seed(1)

  const software = fakeSoftware()
  const business = fakeBusiness()
  const isSingleYear = software.type === SoftwareType.SINGLE_YEAR
  const input = {
    software,
    business,

    taxYear: isSingleYear ? faker.date.past().getFullYear() : undefined,
    dataRangeStartDate: isSingleYear ? undefined : faker.date.past(),
    dataRangeEndDate: isSingleYear ? undefined : faker.date.past(),
    processStartDate: faker.date.past(),
    processStartTime: faker.date.past(),
    languageCode: faker.helpers.enumValue(LanguageCode),
    leadingCurrency: faker.finance.currencyCode(),
    encoding: faker.helpers.enumValue(FileEncoding),
    compressionSoftware: 'zip',

    documents: [fakeDocument()],
  }

  return input
}
