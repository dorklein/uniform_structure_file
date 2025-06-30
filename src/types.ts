import exp from "constants";

export type Dictionary<T = unknown> = { [key: string]: T }

export enum HasBranches {
  NO = 0,
  YES = 1,
}

export interface BaseAddress {
  street?: string | undefined
  houseNumber?: string | undefined
  city?: string | undefined
  zipCode?: string | undefined
}
export interface BusinessAddress extends BaseAddress {}
export interface CustomerOrVendorAddress extends BaseAddress {
  country?: string | undefined
  countryCode?: string | undefined
}

export interface BusinessData {
  taxId: number
  companyId?: number | undefined // ח״פ
  name: string
  address?: BusinessAddress
  hasBranches: HasBranches
  branchId?: string | undefined
}

export enum SoftwareType {
  SINGLE_YEAR = 1,
  MULTI_YEAR = 2,
}

export enum SoftwareAccountingType {
  notRelevant = 0,
  singleEntry = 1,
  doubleEntry = 2,
}

export enum RequiredAccountingBalance {
  trafficLevel = 1,
  doseLevel = 2,
}

export interface SoftwareData {
  registrationNumber: number
  name: string
  version: string
  companyTaxId: number
  companyName: string
  type: SoftwareType
  accountingType: SoftwareAccountingType
  requiredAccountingBalance?: RequiredAccountingBalance
}

export enum LanguageCode {
  hebrew = 0,
  arabic = 1,
  other = 2,
}

export enum FileEncoding {
  ISO_8859_8 = 1,
  CP_862 = 2,
}

export enum DocumentType {
  ORDER = 100,
  DELIVERY_CERTIFICATE = 200,
  DELIVERY_CERTIFICATE_AGENT = 205,
  RETURN_CERTIFICATE = 210,
  INVOICE = 300,
  TAX_INVOICE = 305,
  CONCENTRATION_INVOICE = 310,
  INVOICE_RECEIPT = 320,
  REFUND_INVOICE = 330,
  REFUND_ARMOR = 340,
  INVOICE_AGENT = 345,
  RECEIPT = 400,
  DONATION_RECEIPT = 405,
  CHECKOUT_EXIT = 410,
  BANK_DEPOSIT = 420,
  PURCHASE_ORDER = 500,
  DELIVERY_ORDER_CERTIFICATE = 600,
  PURCHASE_RETURN = 610,
  PURCHASE_INVOICE = 700,
  PURCHASE_REFUND = 710,
  OPENING_BALANCE = 800,
  GENERAL_INVENTORY_ENTRY = 810,
  GENERAL_INVENTORY_EXIT = 820,
  TRANSFER_BETWEEN_WAREHOUSES = 830,
  UPDATE_AFTER_COUNTING = 840,
  PRODUCTION_REPORT_ENTRY = 900,
  PRODUCTION_REPORT_EXIT = 910,
}

export enum TransactionType {
  SERVICE = 1,
  SALE = 2,
  SERVICE_AND_SALE = 3,
}
export enum PaymentMethod {
  CASH = 1,
  CHECK = 2,
  CREDIT_CARD = 3,
  BANK_TRANSFER = 4,
  VOUCHER = 5,
  EXCHANGE_SLIP = 6,
  BILL = 7,
  DIRECT_DEBIT = 8,
  OTHER = 9,
}

export enum CreditCardCompany {
  ISRACARD = 1,
  CAL = 2,
  DINERS = 3,
  AMERICAN_EXPRESS = 4,
  LEUMI_CARD = 6,
}

export enum CreditCardTransactionType {
  REGULAR = 1,
  INSTALLMENTS = 2,
  CREDIT = 3,
  DEFERRED = 4,
  OTHER = 5,
}

/**
 * 1 - חובה, הוצאה; 2 - זכות, הכנסה
 */
export enum ActionType {
  DEBIT = 1,
  CREDIT = 2,
}
export interface CustomerOrVendor {
  taxId?: number | undefined
  name: string
  address?: CustomerOrVendorAddress | undefined
  phone?: string | undefined
  key: string | undefined
}

export interface DocumentItem {
  // documentType: DocumentType
  // documentNumber: string
  lineNumber: number
  documentTypeBase?: number | undefined
  documentNumberBase?: string | undefined
  transactionType: TransactionType
  catalogId?: string | undefined
  description: string | undefined
  manufacturerName?: string | undefined
  manufacturerSerialNumber?: string | undefined
  unitOfMeasure?: string | undefined
  quantity: string
  unitPriceExcludingVAT: string
  lineDiscount?: string | undefined
  lineTotal: string
  lineVATRate: number
}

export interface DocumentPayment {
  lineNumber: number
  paymentMethod: PaymentMethod
  bankId?: number | undefined
  branchId?: number | undefined
  accountNumber?: number | undefined
  checkNumber?: number | undefined
  paymentDueDate?: Date | undefined
  amount: string
  creditCardCompany?: CreditCardCompany | undefined
  creditCardName?: string | undefined
  creditCardTransactionType?: CreditCardTransactionType | undefined
}

// B100
export interface AccountingActions {
  transactionNumber: number
  transactionLineNumber: number
  dish?: number | undefined
  reference?: string | undefined
  referenceDocumentType?: DocumentType | undefined
  reference2?: string | undefined
  reference2DocumentType?: DocumentType | undefined
  details?: string | undefined
  date: Date
  valueDate: Date
  accountKey: string
  contraAccountKey?: string | undefined
  actionType: ActionType
  currencyCode?: string | undefined
  amount: string
  foreignCurrencyAmount?: string
  quantity?: string | undefined
  matchField1?: string | undefined
  matchField2?: string | undefined
  entryDate: Date
  userWhoMadeTheAction?: string | undefined
}

export interface AccountingAccount {
  // B110
  accountKey: string
  accountName: string
  accountBalanceCode: string
  accountBalanceCodeDescription: string
  centerAccount?: string | undefined
  openingBalance: string
  totalDebit: string
  totalCredit: string
  govClassificationCode?: number | undefined
  openingBalanceInForeignCurrency?: string | undefined
}

export interface InventoryItem {
  //  M100
  universalItemCode?: string | undefined
  supplierItemCode?: string | undefined
  internalItemCode: string
  itemName: string
  sortingCode?: string | undefined
  sortingCodeDescription?: string | undefined
  unitOfMeasure: string
  openingBalance: string
  totalEntries: string
  totalOutputs: string
  costPriceOutside?: number | undefined
  costPrice?: number | undefined
}
export interface DocumentRecord {
  documentType: DocumentType
  documentNumber: string
  documentCreationDate: Date
  documentCreationTime: Date
  customerOrVendor: CustomerOrVendor
  matchingField?: string | undefined
  isCanceled?: string | undefined
  documentDate: Date
  valueDate: Date
  finalSumInForeignCurrency?: number | undefined
  currencyCode?: string | undefined
  documentSumBeforeDiscount: string
  discount?: string | undefined
  documentSumAfterDiscountExcludingVat?: string | undefined
  vatSum?: string | undefined
  documentSumIncludingVat?: string | undefined
  deductionAtSourceSum?: string | undefined
  linkField: string

  // D110
  items: DocumentItem[]

  // D120
  payments: DocumentPayment[]
}

export interface UniformStructureInput {
  software: SoftwareData
  business: BusinessData
  taxYear?: number | undefined
  dataRangeStartDate?: Date | undefined
  dataRangeEndDate?: Date | undefined
  processStartDate: Date
  processStartTime: Date
  languageCode: LanguageCode
  leadingCurrency: string | undefined
  encoding: FileEncoding | undefined
  compressionSoftware: string | undefined

  documents: DocumentRecord[]

  accountingActions: AccountingActions[]
  accountingAccounts: AccountingAccount[]
  inventoryItems: InventoryItem[]
}

export type CellType =
  | 'string'
  | 'number'
  | 'positive'
  | 'negative'
  | 'boolean'
  | 'date'
  | 'time'
  | 'datetime'
export interface Cell<T = undefined> {
  fieldId: number
  name: string
  description: string
  type: CellType
  length: number
  startAt: number
  endAt: number
  decimalPlaces?: number | undefined
  default?: string | number | undefined

  /**
   * @param input The input object
   * @param item The item object for when it in an array or in a nested array
   */
  required:
    | boolean
    | string
    | ((input: UniformStructureInput, item: T) => boolean | string)

  validator?: (
    value: string | number | Date | undefined,
    item: T
  ) => boolean | string
}

export interface Row<T = undefined> {
  cells: Cell<T>[]
}

export interface INISchema {
  header: Row
  summaryRow: Row
}

export interface BKMVDATASchema {
  header: Row
  footer: Row
  C100: Row<DocumentRecord>
  D110: Row<DocumentItem>
  D120: Row<DocumentPayment>
  B100: Row<AccountingActions>
  B110: Row<AccountingAccount>
  M100: Row<InventoryItem>
}

export interface BKMVDATARowsCount extends Dictionary<number> {
  B100: number
  B110: number
  C100: number
  D110: number
  D120: number
  M100: number
}

export type RecordTypeCode = 'A100' | 'B100' | 'B110' | 'C100' | 'D110' | 'D120' | 'M100' | 'Z900'

export interface RecordTypesDetail {
  code: RecordTypeCode
  label: string
  totalRecords: number
}

export interface DataValidationOutput {
  documentTypeNumber: DocumentType
  documentTypeLabel: string
  quantity: number
  sum: number

}
export interface USFResult {
  businessName: string
  businessTaxId: number
  fromDate: Date
  toDate: Date
  savePath: string
  softwareName: string
  generatedAt: Date
  recordTypesDetails: RecordTypesDetail[]
  dataValidationOutput: DataValidationOutput[]
}