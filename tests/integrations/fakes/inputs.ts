import {
  BusinessData,
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

function fakeSoftware(): SoftwareData {
  return {
    registrationNumber: faker.number.int(99999999),
    name: faker.company.name(),
    version: faker.string.numeric({ length: { min: 1, max: 20 } }),
    companyTaxId: faker.number.int(999999999),
    companyName: faker.company.name(),
    type: faker.helpers.enumValue(SoftwareType),
    accountingType: faker.helpers.enumValue(SoftwareAccountingType),
  }
}

function fakeBusiness(): BusinessData {
  const hasBranches = faker.helpers.enumValue(HasBranches)
  return {
    taxId: faker.number.int(999999999),
    companyId: faker.number.int(999999999),
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
    taxId: faker.number.int({ min: 0, max: 999999999 }),
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
      length: { min: 1, max: 17 },
    }),
    unitPriceExcludingVAT: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 15 },
    }),
    // lineDiscount?: string
    lineTotal: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 15 },
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
    paymentDueDate: isCheckOrCredit ? faker.date.anytime() : undefined,
    amount: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 15 },
    }),
    // creditCardCompany?: CreditCardCompany
    // creditCardName?: string
    // creditCardTransactionType?: CreditCardTransactionType
  }
}

function fakeDocument(): DocumentRecord {
  return {
    documentType: faker.helpers.enumValue(DocumentType),
    documentNumber: faker.string.numeric({
      allowLeadingZeros: true,
      length: { min: 1, max: 20 },
    }),
    documentCreationDate: faker.date.anytime(),
    documentCreationTime: faker.date.anytime(),
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

  const business = fakeBusiness()
  const input = {
    software: fakeSoftware(),
    business,

    taxYear: faker.date.anytime().getFullYear(),
    processStartDate: faker.date.anytime(),
    processStartTime: faker.date.anytime(),
    languageCode: faker.helpers.enumValue(LanguageCode),
    leadingCurrency: faker.finance.currencyCode(),
    encoding: faker.helpers.enumValue(FileEncoding),
    compressionSoftware: 'zip',

    documents: [fakeDocument()],
  }

  return input
}
