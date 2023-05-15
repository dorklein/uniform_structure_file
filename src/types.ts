export enum HasBranches {
  NO = 0,
  YES = 1,
}

export interface BaseAddress {
  street?: string
  houseNumber?: string
  city?: string
  zipCode?: string
}
export interface BusinessAddress extends BaseAddress {}
export interface CustomerOrVendorAddress extends BaseAddress {
  country?: string
  countryCode?: string
}

export interface BusinessData {
  taxId: number
  companyId?: number // ח״פ
  name: string
  address?: BusinessAddress
  hasBranches: HasBranches
}

export enum SoftwareType {
  singleYear = 1,
  multiYear = 2,
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
  IOS_8859_8 = 1,
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

export interface DocumentRecord {
  documentType: DocumentType
}

export interface UniformStructureInput {
  software: SoftwareData
  business: BusinessData
  taxYear?: number
  dataRangeStartDate?: Date
  dataRangeEndDate?: Date
  processStartDate: Date
  languageCode: LanguageCode
  leadingCurrency: string
  encoding: FileEncoding
  compressionSoftware: string
}

export interface BaseCell {
  fieldId: number
  name?: string
  description: string
  type: 'string' | 'number' | 'positive' | 'negative' | 'boolean'
  length: number
  startAt: number
  endAt: number
  default?: string | number
}
export interface Cell extends BaseCell {
  required: boolean | ((input: UniformStructureInput) => boolean)
}

export interface Row {
  cells: Cell[]
}

export interface DocumentCell extends BaseCell {
  required: boolean | ((input: DocumentRecord) => boolean)
}

export interface DocumentRow {
  cells: DocumentCell[]
}

export interface INIFormat {
  header: Row
  summaryRow: Row
}

export interface BKMVDATAFormat {
  header: Row
  footer: Row
  c100Row: DocumentRow
  D110Row: DocumentRow
  D120Row: DocumentRow
  B100Row: DocumentRow
  B110Row: DocumentRow
  M100Row: DocumentRow
}
