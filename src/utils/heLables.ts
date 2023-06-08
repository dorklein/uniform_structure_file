import {DocumentType, RecordTypeCode} from "../types";



export function documentTypeLabel(documentType: DocumentType): string {
    return {
        [DocumentType.ORDER]: 'הזמנה',
        [DocumentType.DELIVERY_CERTIFICATE]: 'תעודת משלוח',
        [DocumentType.DELIVERY_CERTIFICATE_AGENT]: 'תעודת משלוח סוכן',
        [DocumentType.RETURN_CERTIFICATE]: 'תעודת החזרה',
        [DocumentType.INVOICE]: 'חשבונית/חשבונית עסקה',
        [DocumentType.TAX_INVOICE]: 'חשבונית מס',
        [DocumentType.CONCENTRATION_INVOICE]: 'חשבונית ריכוז',
        [DocumentType.INVOICE_RECEIPT]: 'חשבונית מס / קבלה',
        [DocumentType.REFUND_INVOICE]: 'חשבונית מס זיכוי',
        [DocumentType.REFUND_ARMOR]: 'חשבונית שריון',
        [DocumentType.INVOICE_AGENT]: 'חשבונית סוכן',
        [DocumentType.RECEIPT]: 'קבלה',
        [DocumentType.DONATION_RECEIPT]: 'קבלה על תרומות',
        [DocumentType.CHECKOUT_EXIT]: 'יציאה מקופה',
        [DocumentType.BANK_DEPOSIT]: 'הפקדת בנק',
        [DocumentType.PURCHASE_ORDER]: 'הזמנת רכש',
        [DocumentType.DELIVERY_ORDER_CERTIFICATE]: 'תעודת משלוח רכש',
        [DocumentType.PURCHASE_RETURN]: 'החזרת רכש',
        [DocumentType.PURCHASE_INVOICE]: 'חשבונית מס רכש',
        [DocumentType.PURCHASE_REFUND]: 'זיכוי רכש',
        [DocumentType.OPENING_BALANCE]: 'יתרת פתיחה',
        [DocumentType.GENERAL_INVENTORY_ENTRY]: 'כניסה כללית למלאי',
        [DocumentType.GENERAL_INVENTORY_EXIT]: 'יציאה כללית מהמלאי',
        [DocumentType.TRANSFER_BETWEEN_WAREHOUSES]: 'העברה בין מחסנים',
        [DocumentType.UPDATE_AFTER_COUNTING]: 'עדכון בעקבות ספירה',
        [DocumentType.PRODUCTION_REPORT_ENTRY]: 'דוח ייצור-כניסה',
        [DocumentType.PRODUCTION_REPORT_EXIT]: 'דוח ייצור-יציאה',

    }[documentType]
}

export function recordTypeLabel(code: RecordTypeCode): string {
    return {
        'A100': 'רשומה פתיחה',
        'B100': 'תנועות בהנהלת חשבונות',
        'B110': 'חשבון בהנהלת חשבונות',
        'C100': 'כותרת מסמך',
        'D110': 'פרטי מסמך',
        'D120': 'פרטי קבלות',
        'M100': 'פריטים במלאי',
        'Z900': 'רשומת סיום',
    }[code]
}