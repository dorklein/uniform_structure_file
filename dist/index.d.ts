declare enum HasBranches {
    NO = 0,
    YES = 1
}
interface BaseAddress {
    street?: string;
    houseNumber?: string;
    city?: string;
    zipCode?: string;
}
interface BusinessAddress extends BaseAddress {
}
interface CustomerOrVendorAddress extends BaseAddress {
    country?: string;
    countryCode?: string;
}
interface BusinessData {
    taxId: number;
    companyId?: number;
    name: string;
    address?: BusinessAddress;
    hasBranches: HasBranches;
    branchId?: string;
}
declare enum SoftwareType {
    SINGLE_YEAR = 1,
    MULTI_YEAR = 2
}
declare enum SoftwareAccountingType {
    notRelevant = 0,
    singleEntry = 1,
    doubleEntry = 2
}
declare enum RequiredAccountingBalance {
    trafficLevel = 1,
    doseLevel = 2
}
interface SoftwareData {
    registrationNumber: number;
    name: string;
    version: string;
    companyTaxId: number;
    companyName: string;
    type: SoftwareType;
    accountingType: SoftwareAccountingType;
    requiredAccountingBalance?: RequiredAccountingBalance;
}
declare enum LanguageCode {
    hebrew = 0,
    arabic = 1,
    other = 2
}
declare enum FileEncoding {
    ISO_8859_8 = 1,
    CP_862 = 2
}
declare enum DocumentType {
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
    PRODUCTION_REPORT_EXIT = 910
}
declare enum TransactionType {
    SERVICE = 1,
    SALE = 2,
    SERVICE_AND_SALE = 3
}
declare enum PaymentMethod {
    CASH = 1,
    CHECK = 2,
    CREDIT_CARD = 3,
    BANK_TRANSFER = 4,
    VOUCHER = 5,
    EXCHANGE_SLIP = 6,
    BILL = 7,
    DIRECT_DEBIT = 8,
    OTHER = 9
}
declare enum CreditCardCompany {
    ISRACARD = 1,
    CAL = 2,
    DINERS = 3,
    AMERICAN_EXPRESS = 4,
    LEUMI_CARD = 6
}
declare enum CreditCardTransactionType {
    REGULAR = 1,
    INSTALLMENTS = 2,
    CREDIT = 3,
    DEFERRED = 4,
    OTHER = 5
}
interface CustomerOrVendor {
    taxId?: number;
    name: string;
    address?: CustomerOrVendorAddress;
    phone?: string;
    key: string;
}
interface DocumentItem {
    lineNumber: number;
    documentTypeBase?: number;
    documentNumberBase?: string;
    transactionType: TransactionType;
    catalogId?: string;
    description: string;
    manufacturerName?: string;
    manufacturerSerialNumber?: string;
    unitOfMeasure?: string;
    quantity: string;
    unitPriceExcludingVAT: string;
    lineDiscount?: string;
    lineTotal: string;
    lineVATRate: number;
}
interface DocumentPayment {
    lineNumber: number;
    paymentMethod: PaymentMethod;
    bankId?: number;
    branchId?: number;
    accountNumber?: number;
    checkNumber?: number;
    paymentDueDate?: Date;
    amount: string;
    creditCardCompany?: CreditCardCompany;
    creditCardName?: string;
    creditCardTransactionType?: CreditCardTransactionType;
}
interface DocumentRecord {
    documentType: DocumentType;
    documentNumber: string;
    documentCreationDate: Date;
    documentCreationTime: Date;
    customerOrVendor: CustomerOrVendor;
    matchingField?: string;
    isCanceled?: string;
    documentDate: Date;
    valueDate: Date;
    finalSumInForeignCurrency?: number;
    currencyCode?: string;
    documentSumBeforeDiscount: string;
    discount?: string;
    documentSumAfterDiscountExcludingVat?: string;
    vatSum?: string;
    documentSumIncludingVat?: string;
    deductionAtSourceSum?: string;
    linkField: string;
    items: DocumentItem[];
    payments: DocumentPayment[];
}
interface UniformStructureInput {
    software: SoftwareData;
    business: BusinessData;
    taxYear?: number;
    dataRangeStartDate?: Date;
    dataRangeEndDate?: Date;
    processStartDate: Date;
    processStartTime: Date;
    languageCode: LanguageCode;
    leadingCurrency: string;
    encoding: FileEncoding;
    compressionSoftware: string;
    documents: DocumentRecord[];
}

declare function generateUSF(input: UniformStructureInput): Promise<void>;

export { generateUSF };
