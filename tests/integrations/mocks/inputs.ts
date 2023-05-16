import {
  DocumentType,
  FileEncoding,
  HasBranches,
  LanguageCode,
  PaymentMethod,
  SoftwareAccountingType,
  SoftwareType,
  TransactionType,
  UniformStructureInput,
} from '../../../src/types'

export const inputMock: UniformStructureInput = {
  software: {
    registrationNumber: 187804,
    name: 'GREEN INVOICE',
    version: '6.0',
    companyTaxId: 514756428,
    companyName: 'GREEN INVOICE LTD',
    type: SoftwareType.singleYear,
    accountingType: SoftwareAccountingType.singleEntry,
  },
  business: {
    taxId: 304834740,
    companyId: 304834740,
    name: 'יהוסף ושות� משרד עורכי דין',
    address: {
      street: 'ברקוביץ',
      houseNumber: '4',
      city: 'תל אביב - יפו',
      zipCode: '6423806',
    },
    hasBranches: HasBranches.NO,
  },

  taxYear: 2020,
  processStartDate: new Date(),
  processStartTime: new Date(),
  languageCode: LanguageCode.hebrew,
  leadingCurrency: 'ILS',
  encoding: FileEncoding.ISO_8859_8,
  compressionSoftware: 'zip',

  documents: [],
}

export const fullInputMock: UniformStructureInput = {
  software: {
    registrationNumber: 187804,
    name: 'GREEN INVOICE',
    version: '6.0',
    companyTaxId: 514756428,
    companyName: 'GREEN INVOICE LTD',
    type: SoftwareType.singleYear,
    accountingType: SoftwareAccountingType.singleEntry,
  },
  business: {
    taxId: 304834740,
    companyId: 304834740,
    name: 'יהוסף ושות� משרד עורכי דין',
    address: {
      street: 'ברקוביץ',
      houseNumber: '4',
      city: 'תל אביב - יפו',
      zipCode: '6423806',
    },
    hasBranches: HasBranches.NO,
  },

  taxYear: 2020,
  processStartDate: new Date(),
  processStartTime: new Date(),
  languageCode: LanguageCode.hebrew,
  leadingCurrency: 'ILS',
  encoding: FileEncoding.ISO_8859_8,
  compressionSoftware: 'zip',

  documents: [
    {
      documentType: DocumentType.INVOICE,
      documentNumber: '1234',
      documentCreationDate: new Date(),
      documentCreationTime: new Date(),
      customerOrVendor: {
        name: 'ישראל ישראלי',
        key: '123456789',
      },
      documentDate: new Date('2020-01-01'),
      valueDate: new Date('2020-03-01'),
      // finalSumInForeignCurrency?: number
      // currencyCode?: string
      documentSumBeforeDiscount: '1000',
      // discount?: string
      documentSumAfterDiscountExcludingVat: '1000',
      vatSum: '1700',
      documentSumIncludingVat: '1170',
      deductionAtSourceSum: '0',
      linkField: '1234',

      // D110
      items: [
        {
          lineNumber: 1,
          transactionType: TransactionType.SALE,
          // catalogId?: string
          description: 'מוצר 1',
          // manufacturerName?: string
          // manufacturerSerialNumber?: string
          // unitOfMeasure?: string
          quantity: '8',
          unitPriceExcludingVAT: '100',
          // lineDiscount?: string
          lineTotal: '800',
          lineVATRate: 1700,
        },
      ],

      // D120
      payments: [
        {
          lineNumber: 1,
          paymentMethod: PaymentMethod.CASH,
          // bankId?: string
          // branchId?: string
          // accountNumber?: string
          // checkNumber?: string
          // paymentDueDate?: Date
          amount: '1170',
          // creditCardCompany?: CreditCardCompany
          // creditCardName?: string
          // creditCardTransactionType?: CreditCardTransactionType
        },
      ],
    },
    {
      documentType: DocumentType.INVOICE,
      documentNumber: '1234',
      documentCreationDate: new Date(),
      documentCreationTime: new Date(),
      customerOrVendor: {
        name: 'ישראל ישראלי',
        key: '123456789',
      },
      documentDate: new Date('2020-01-01'),
      valueDate: new Date('2020-03-01'),
      // finalSumInForeignCurrency?: number
      // currencyCode?: string
      documentSumBeforeDiscount: '1000',
      // discount?: string
      documentSumAfterDiscountExcludingVat: '1000',
      vatSum: '1700',
      documentSumIncludingVat: '1170',
      deductionAtSourceSum: '0',
      linkField: '1234',

      // D110
      items: [
        {
          lineNumber: 1,
          transactionType: TransactionType.SALE,
          // catalogId?: string
          description: 'מוצר 1',
          // manufacturerName?: string
          // manufacturerSerialNumber?: string
          // unitOfMeasure?: string
          quantity: '8',
          unitPriceExcludingVAT: '100',
          // lineDiscount?: string
          lineTotal: '800',
          lineVATRate: 1700,
        },
      ],

      // D120
      payments: [
        {
          lineNumber: 1,
          paymentMethod: PaymentMethod.CASH,
          // bankId?: string
          // branchId?: string
          // accountNumber?: string
          // checkNumber?: string
          // paymentDueDate?: Date
          amount: '1170',
          // creditCardCompany?: CreditCardCompany
          // creditCardName?: string
          // creditCardTransactionType?: CreditCardTransactionType
        },
      ],
    },
  ],
}
