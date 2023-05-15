import {describe, expect, test} from '@jest/globals';

import {
    BusinessAddress, FileEncoding, HasBranches, LanguageCode,
    RequiredAccountingBalance,
    SoftwareAccountingType,
    SoftwareType,
    UniformStructureInput
} from "../src/types";
import {createINI} from "../src";

const input: UniformStructureInput = {
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
    languageCode: LanguageCode.hebrew,
    leadingCurrency: 'ILS',
    encoding: FileEncoding.IOS_8859_8,
    compressionSoftware: 'zip',
}

describe('INI format', () => {
    test('works', async () => {
        const text = await createINI(input)

        console.log(text)
    })
})