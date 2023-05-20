"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  generateUSF: () => generateUSF
});
module.exports = __toCommonJS(src_exports);

// src/utils/dates.ts
function isDate(obj) {
  return obj instanceof Date;
}
function dateToYYYYMMDD(date) {
  const dateFormatter = new Intl.DateTimeFormat("he-IL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = dateFormatter.formatToParts(date);
  return `${parts[4].value}${parts[2].value}${parts[0].value}`;
}
function dateToHHMM(date) {
  const dateFormatter = new Intl.DateTimeFormat("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const strDate = dateFormatter.format(date);
  return strDate.replace(/:/g, "");
}
function dateToMMDDhhmm(date) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const strDate = dateFormatter.format(date);
  return strDate.replace(/[\/:, ]/g, "");
}

// src/utils/strings.ts
function isString(obj) {
  return typeof obj === "string" || obj instanceof String;
}
var padNumbers = (number, length, decimalPlaces) => {
  try {
    const str = (+number).toFixed(decimalPlaces).replace(".", "");
    return str.padStart(length, "0");
  } catch (e) {
    console.log(number, typeof number, e);
    throw new Error(`Invalid number ${number}`);
  }
};
var padString = (str, length) => {
  return str.padEnd(length, " ");
};
function padEmptyByType(type, length, decimalPlaces) {
  switch (type) {
    case "date":
    case "time":
    case "number":
      return padNumbers(0, length, decimalPlaces);
    case "string":
      return padString("", length);
    case "boolean":
      return "0";
    case "positive":
    case "negative":
      return `+${padNumbers(0, length - 1, decimalPlaces)}`;
    default:
      throw new Error(`Invalid type ${type}`);
  }
}
var padByType = (type, value, length, decimalPlaces = 0) => {
  if (value === null) {
    return padEmptyByType(type, length, decimalPlaces);
  }
  if (type === "negative" && value === "0") {
    return padEmptyByType(type, length, decimalPlaces);
  }
  switch (type) {
    case "date":
      if (!isDate(value))
        throw new Error(`Invalid date value ${value}`);
      return dateToYYYYMMDD(value);
    case "time":
      if (!isDate(value))
        throw new Error(`Invalid time value ${value}`);
      return dateToHHMM(value);
    case "string":
      return padString(value, length);
    case "number":
      return padNumbers(value, length, decimalPlaces);
    case "boolean":
      value = parseInt(`${value}`);
      if (value !== 1 && value !== 0)
        value = 0;
      return padString(`${value}`, length);
    case "positive":
      return `+${padNumbers(value, length - 1, decimalPlaces)}`;
    case "negative":
      return `-${padNumbers(value, length - 1, decimalPlaces)}`;
    default:
      throw new Error(`Invalid type ${type}`);
  }
};

// src/generator/baseGenerator.ts
var import_promises = __toESM(require("fs/promises"));
var path = __toESM(require("path"));
var iconv = __toESM(require("iconv-lite"));
var _input, _uuid, _filePath, _text, _lines;
var _BaseGenerator = class {
  constructor(input, uuid, filePath) {
    __privateAdd(this, _input, void 0);
    __privateAdd(this, _uuid, void 0);
    __privateAdd(this, _filePath, void 0);
    __privateAdd(this, _text, void 0);
    __privateAdd(this, _lines, void 0);
    this.customComputedValues = {};
    __privateSet(this, _input, input);
    __privateSet(this, _uuid, uuid);
    __privateSet(this, _filePath, filePath);
    __privateSet(this, _lines, []);
    __privateSet(this, _text, "");
  }
  get input() {
    return __privateGet(this, _input);
  }
  get uuid() {
    return __privateGet(this, _uuid);
  }
  get lines() {
    return __privateGet(this, _lines);
  }
  get runningNumber() {
    return __privateGet(this, _lines).length + 1;
  }
  computedValues(cell) {
    switch (cell.name) {
      case "uuid":
        return +this.uuid;
      case "runningNumber":
      case "totalRecords":
        return this.runningNumber;
      default:
        if (cell.name in this.customComputedValues) {
          return this.customComputedValues[cell.name];
        }
        return void 0;
    }
  }
  createRow(rowSchema, getValue, item) {
    var _a;
    let text = "";
    for (const cell of rowSchema.cells) {
      let cellText = "";
      const value = getValue(cell);
      if (cell.validator !== void 0) {
        const valid = cell.validator(value, item);
        if (!valid || isString(valid)) {
          throw new Error(
            `Invalid value for [${cell.fieldId}:${cell.name}] ${isString(valid) ? valid : ""}`
          );
        }
      }
      if (value === void 0) {
        let required = cell.required;
        if (typeof cell.required === "function")
          required = cell.required(this.input, item);
        if (required && !["positive", "negative"].includes(cell.type)) {
          throw new Error(
            isString(required) ? required : `Required field [${cell.fieldId}]'${cell.name}' has no default value`
          );
        }
        cellText = padByType(cell.type, null, cell.length);
      } else {
        if (!["date", "time"].includes(cell.type) && (+value).toFixed((_a = cell.decimalPlaces) != null ? _a : 0).length > cell.length)
          throw new Error(
            `Value for [${cell.fieldId}:${cell.name}] ${value} is longer than ${cell.length}`
          );
        try {
          cellText = padByType(
            cell.type,
            value,
            cell.length,
            cell.decimalPlaces
          );
        } catch (e) {
          throw new Error(
            `Error while padding value for ${JSON.stringify(
              cell
            )} - ${value} - ${e}`
          );
        }
      }
      if (cellText.length !== cell.length) {
        throw new Error(
          `Value for [${cell.fieldId}:${cell.name}] ${cellText} should be of length ${cell.length}. Got ${cellText.length}`
        );
      }
      text += cellText;
    }
    __privateGet(this, _lines).push(text);
  }
  get encoding() {
    if (this.input.encoding === 2 /* CP_862 */) {
      return "CP862";
    }
    return "ISO-8859-8";
  }
  saveToFile() {
    return __async(this, null, function* () {
      this.create();
      this.validateBeforeSave();
      const text = __privateGet(this, _lines).join(_BaseGenerator.NEW_LINE);
      yield import_promises.default.mkdir(path.parse(__privateGet(this, _filePath)).dir, { recursive: true });
      const buf = iconv.encode(text, this.encoding);
      yield import_promises.default.writeFile(__privateGet(this, _filePath), buf);
    });
  }
};
var BaseGenerator = _BaseGenerator;
_input = new WeakMap();
_uuid = new WeakMap();
_filePath = new WeakMap();
_text = new WeakMap();
_lines = new WeakMap();
BaseGenerator.NEW_LINE = "\n";

// src/utils/objs.ts
var isObject = (obj) => {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
};
function getNestedValue(obj, key) {
  if (!isObject(obj))
    return obj;
  const keys = key.split(".");
  let value = obj;
  for (const key2 of keys) {
    const newValue = value[key2];
    if (!isObject(newValue))
      return newValue;
    value = newValue;
  }
  return value;
}

// src/utils/validators.ts
var import_types2 = require("util/types");

// src/utils/ssnValidator.ts
function ssnValidator(id) {
  id = id.toString().padStart(9, "0");
  if (isNaN(+id)) {
    return false;
  }
  let sum = 0, incNum;
  for (let i = 0; i < id.length; i++) {
    incNum = +id[i] * (i % 2 + 1);
    sum += incNum > 9 ? incNum - 9 : incNum;
  }
  return sum % 10 === 0;
}

// src/utils/validators.ts
var import_currency_codes = __toESM(require("currency-codes"));
function isValidDate(value) {
  if (!value)
    return `Date ${value} is invalid`;
  if (!(0, import_types2.isDate)(value))
    return `Date ${value} is invalid`;
  const today = /* @__PURE__ */ new Date();
  return value.getTime() <= today.getTime() || `Date ${value} is in the future`;
}
function isOptionalValidDate(value) {
  if (!value)
    return true;
  return isValidDate(value);
}
function isValidSSN(value) {
  if (!value)
    return `SSN ${value} is invalid`;
  if ((0, import_types2.isDate)(value))
    return `SSN ${value} is invalid`;
  return ssnValidator(value) || `SSN ${value} check digit is invalid`;
}
function isValidCurrencyCode(value) {
  if (!isString(value))
    return `Currency code ${value} is invalid`;
  return !!import_currency_codes.default.code("EUR") || `Currency code ${value} is invalid`;
}
function isOptionalValidCurrencyCode(value) {
  if (!value)
    return true;
  return isValidCurrencyCode(value);
}

// src/schemas/iniSchema.ts
var header = {
  cells: [
    {
      fieldId: 1e3,
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      type: "string",
      length: 4,
      startAt: 1,
      endAt: 4,
      required: true,
      default: "A000"
    },
    {
      fieldId: 1001,
      name: "forFutureData",
      description: "\u05DC\u05E9\u05D9\u05DE\u05D5\u05E9 \u05E2\u05EA\u05D9\u05D3\u05D9",
      type: "string",
      length: 5,
      startAt: 5,
      endAt: 9,
      required: false
    },
    {
      fieldId: 1002,
      name: "numberOfRowsInBKMVDATA",
      description: "\u05E1\u05DA \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA \u05D1\u05E7\u05D5\u05D1\u05E5 BKMVDATA",
      type: "number",
      length: 15,
      startAt: 10,
      endAt: 24,
      required: true
    },
    {
      fieldId: 1003,
      name: "business.taxId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      type: "number",
      length: 9,
      startAt: 25,
      endAt: 33,
      required: true,
      validator: isValidSSN
    },
    {
      fieldId: 1004,
      name: "uuid",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E8\u05D0\u05E9\u05D9",
      type: "number",
      length: 15,
      startAt: 34,
      endAt: 48,
      required: true
    },
    {
      fieldId: 1005,
      name: "systemConstant",
      description: "\u05E7\u05D1\u05D5\u05E2 \u05DE\u05E2\u05E8\u05DB\u05EA",
      type: "string",
      length: 8,
      startAt: 49,
      endAt: 56,
      required: true,
      default: "&OF1.31&"
    },
    {
      fieldId: 1006,
      name: "software.registrationNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E8\u05D9\u05E9\u05D5\u05DD \u05D4\u05EA\u05D5\u05DB\u05E0\u05D4",
      type: "number",
      length: 8,
      startAt: 57,
      endAt: 64,
      required: true
    },
    {
      fieldId: 1007,
      name: "software.name",
      description: "\u05E9\u05DD \u05D4\u05EA\u05D5\u05DB\u05E0\u05D4",
      type: "string",
      length: 20,
      startAt: 65,
      endAt: 84,
      required: true
    },
    {
      fieldId: 1008,
      name: "software.version",
      description: "\u05DE\u05D4\u05D3\u05D5\u05E8\u05EA \u05D4\u05EA\u05D5\u05DB\u05E0\u05D4",
      type: "string",
      length: 20,
      startAt: 85,
      endAt: 104,
      required: true
    },
    {
      fieldId: 1009,
      name: "software.companyTaxId",
      description: '\u05DE\u05E1\u05E4\u05E8 \u05E2"\u05DE \u05E9\u05DC \u05D9\u05E6\u05E8\u05DF \u05D4\u05EA\u05D5\u05DB\u05E0\u05D4',
      type: "number",
      length: 9,
      startAt: 105,
      endAt: 113,
      required: true,
      validator: isValidSSN
    },
    {
      fieldId: 1010,
      name: "software.companyName",
      description: "\u05E9\u05DD \u05D9\u05E6\u05E8\u05DF \u05D4\u05EA\u05D5\u05DB\u05E0\u05D4",
      type: "string",
      length: 20,
      startAt: 114,
      endAt: 133,
      required: true
    },
    {
      fieldId: 1011,
      name: "software.type",
      description: "\u05E1\u05D5\u05D2 \u05D4\u05EA\u05D5\u05DB\u05E0\u05D4",
      type: "number",
      // 1= חד שנתי, 2 = רב שנתי
      length: 1,
      startAt: 134,
      endAt: 134,
      required: true
    },
    {
      fieldId: 1012,
      name: "dirPath",
      description: "\u05E0\u05EA\u05D9\u05D1 \u05DE\u05D9\u05E7\u05D5\u05DD \u05E9\u05DE\u05D9\u05E8\u05EA \u05D4\u05E7\u05D1\u05E6\u05D9\u05DD",
      type: "string",
      length: 50,
      startAt: 135,
      endAt: 184,
      required: true
    },
    {
      fieldId: 1013,
      name: "software.accountingType",
      description: '\u05E1\u05D5\u05D2 \u05D4\u05E0\u05D4\u05D7"\u05E9 \u05E9\u05DC \u05D4\u05EA\u05D5\u05DB\u05E0\u05D4',
      type: "number",
      // 0=לא רלוונטי, 1=חד צידית, 2=כפולה.
      length: 1,
      startAt: 185,
      endAt: 185,
      required: true
    },
    {
      fieldId: 1014,
      name: "requiredAccountingBalance",
      description: "\u05D0\u05D9\u05D6\u05D5\u05DF \u05D7\u05E9\u05D1\u05D5\u05E0\u05D0\u05D9 \u05E0\u05D3\u05E8\u05E9",
      type: "number",
      // 1=רמת התנועה, 2=רמת המנה. בהנהלת חשבונות כפולה חובה
      length: 1,
      startAt: 186,
      endAt: 186,
      required: false,
      default: 1
    },
    {
      fieldId: 1015,
      name: "business.companyId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05D7\u05D1\u05E8\u05D4 \u05D1\u05E8\u05E9\u05DD \u05D4\u05D7\u05D1\u05E8\u05D5\u05EA",
      type: "number",
      length: 9,
      startAt: 187,
      endAt: 195,
      required: false,
      validator: isValidSSN
    },
    {
      fieldId: 1016,
      name: "DeductionFileID",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05EA\u05D9\u05E7 \u05E0\u05D9\u05DB\u05D5\u05D9\u05D9\u05DD",
      type: "number",
      length: 9,
      startAt: 196,
      endAt: 204,
      required: false
    },
    {
      fieldId: 1017,
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9",
      type: "string",
      length: 10,
      startAt: 205,
      endAt: 214,
      required: false
    },
    {
      fieldId: 1018,
      name: "business.name",
      description: "\u05E9\u05DD \u05D4\u05E2\u05E1\u05E7",
      type: "string",
      length: 50,
      startAt: 215,
      endAt: 264,
      required: true
    },
    {
      fieldId: 1019,
      name: "business.address.street",
      description: "\u05DE\u05E2\u05DF \u05D4\u05E2\u05E1\u05E7 - \u05E8\u05D7\u05D5\u05D1",
      type: "string",
      length: 50,
      startAt: 265,
      endAt: 314,
      required: false
    },
    {
      fieldId: 1020,
      name: "business.address.houseNumber",
      description: "\u05DE\u05E2\u05DF \u05D4\u05E2\u05E1\u05E7 - \u05DE\u05E1 \u05D1\u05D9\u05EA",
      type: "string",
      length: 10,
      startAt: 315,
      endAt: 324,
      required: false
    },
    {
      fieldId: 1021,
      name: "business.address.city",
      description: "\u05DE\u05E2\u05DF \u05D4\u05E2\u05E1\u05E7 - \u05E2\u05D9\u05E8",
      type: "string",
      length: 30,
      startAt: 325,
      endAt: 354,
      required: false
    },
    {
      fieldId: 1022,
      name: "business.address.zipCode",
      description: "\u05DE\u05E2\u05DF \u05D4\u05E2\u05E1\u05E7 - \u05DE\u05D9\u05E7\u05D5\u05D3",
      type: "string",
      length: 8,
      startAt: 355,
      endAt: 362,
      required: false
    },
    {
      fieldId: 1023,
      name: "taxYear",
      description: "\u05E9\u05E0\u05EA \u05D4\u05DE\u05E1",
      type: "number",
      length: 4,
      startAt: 363,
      endAt: 366,
      required: (input) => input.software.type === 1 /* SINGLE_YEAR */ && `taxYear is required when software.type is ${1 /* SINGLE_YEAR */}`
    },
    {
      fieldId: 1024,
      name: "dataRangeStartDate",
      description: "\u05D8\u05D5\u05D5\u05D7 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD - \u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05EA\u05D7\u05DC\u05D4/\u05D7\u05D9\u05EA\u05D5\u05DA",
      type: "date",
      length: 8,
      startAt: 367,
      endAt: 374,
      required: (input) => input.software.type === 2 /* MULTI_YEAR */ && `dataRangeEndDate is required when software.type is ${2 /* MULTI_YEAR */}`,
      validator: isOptionalValidDate
    },
    {
      fieldId: 1025,
      name: "dataRangeEndDate",
      description: "\u05D8\u05D5\u05D5\u05D7 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD - \u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05D9\u05D5\u05DD/\u05D7\u05D9\u05EA\u05D5\u05DA",
      type: "date",
      length: 8,
      startAt: 375,
      endAt: 382,
      required: (input) => input.software.type === 2 /* MULTI_YEAR */ && `dataRangeEndDate is required when software.type is ${2 /* MULTI_YEAR */}`,
      validator: isOptionalValidDate
    },
    {
      fieldId: 1026,
      name: "processStartDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05EA\u05D7\u05D9\u05DC\u05EA \u05D4\u05EA\u05D4\u05DC\u05D9\u05DA",
      type: "date",
      // YYYYMMDD
      length: 8,
      startAt: 383,
      endAt: 390,
      required: true,
      validator: isValidDate
    },
    {
      fieldId: 1027,
      name: "processStartTime",
      description: "\u05E9\u05E2\u05EA \u05D4\u05EA\u05D7\u05DC\u05EA \u05D4\u05EA\u05D4\u05DC\u05D9\u05DA",
      type: "time",
      // HHMM
      length: 4,
      startAt: 391,
      endAt: 394,
      required: true
    },
    /**
     * 0 - עברית
     * 1 - ערבית
     * 2 - אחר
     */
    {
      fieldId: 1028,
      name: "languageCode",
      description: "\u05E7\u05D5\u05D3 \u05E9\u05E4\u05D4",
      type: "number",
      // 0 - עברית, 1 - ערבית, 2 - אחר
      length: 1,
      startAt: 395,
      endAt: 395,
      required: true,
      default: 0
    },
    /**
     * -862CP = 2
     * i-8859-8-ISO = 1
     */
    {
      fieldId: 1029,
      name: "encoding",
      description: "\u05E1\u05D8 \u05EA\u05D5\u05D9\u05DD",
      type: "number",
      // -862CP = 2; i-8859-8-ISO =1
      length: 1,
      startAt: 396,
      endAt: 396,
      required: true,
      default: 1
    },
    {
      fieldId: 1030,
      name: "compressionSoftware",
      description: "\u05E9\u05DD \u05EA\u05D5\u05DB\u05E0\u05EA \u05D4\u05DB\u05D9\u05D5\u05D5\u05E5",
      type: "string",
      length: 20,
      startAt: 397,
      endAt: 416,
      required: true
    },
    {
      fieldId: 1032,
      name: "leadingCurrency",
      description: "\u05DE\u05D8\u05D1\u05E2 \u05DE\u05D5\u05D1\u05D9\u05DC",
      type: "string",
      length: 3,
      startAt: 417,
      endAt: 419,
      required: true,
      default: "ILS"
    },
    /**
     * 1 - בעסק יש סניפים /ענפים
     * 0 - בעסק  סניפים . ראה הבהרה 3 בנספח
     * הבהרות.
     */
    {
      fieldId: 1034,
      name: "business.hasBranches",
      description: "\u05DE\u05D9\u05D3\u05E2 \u05E2\u05DC \u05E1\u05E0\u05D9\u05E4\u05D9\u05DD /\u05E2\u05E0\u05E4\u05D9\u05DD",
      type: "number",
      length: 1,
      startAt: 420,
      endAt: 420,
      required: true,
      default: 0
    },
    {
      fieldId: 1035,
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      type: "string",
      length: 46,
      startAt: 421,
      endAt: 466,
      required: false
    }
  ]
};
var summaryRow = {
  cells: [
    {
      fieldId: 1050,
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      type: "string",
      length: 4,
      startAt: 1,
      endAt: 4,
      required: true
    },
    {
      fieldId: 1051,
      name: "recordsCount",
      description: "\u05E1\u05DA \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA",
      type: "number",
      length: 15,
      startAt: 5,
      endAt: 19,
      required: true
    }
  ]
};
var iniSchema = {
  header,
  summaryRow
};

// src/generator/iniGenerator.ts
var path2 = __toESM(require("path"));

// src/utils/constants.ts
var expectedINILineLength = {
  A000: 466,
  B100: 19,
  B110: 19,
  C100: 19,
  D110: 19,
  D120: 19,
  M100: 19
};
var expectedDATALineLength = {
  A100: 95,
  B100: 317,
  B110: 376,
  C100: 444,
  D110: 339,
  D120: 222,
  M100: 298,
  Z900: 110
};

// src/generator/iniGenerator.ts
var _BKMVDATARowsCount;
var IniGenerator = class extends BaseGenerator {
  constructor(input, uuid, filePath, dataRowsCount) {
    super(input, uuid, filePath);
    __privateAdd(this, _BKMVDATARowsCount, void 0);
    __privateSet(this, _BKMVDATARowsCount, dataRowsCount);
    this.customComputedValues["numberOfRowsInBKMVDATA"] = this.countAllBKMVDATARows();
    this.customComputedValues["dirPath"] = path2.parse(filePath).dir;
  }
  countAllBKMVDATARows() {
    return Object.values(__privateGet(this, _BKMVDATARowsCount)).reduce(
      (partialSum, a) => partialSum + a,
      0
    ) + 2;
  }
  validateHeader() {
    const recordCode = "A000";
    const line = this.lines[0];
    if (!line.startsWith(recordCode)) {
      throw new Error(`INI.txt first line should start with ${recordCode}`);
    }
  }
  validateLength() {
    for (const line of this.lines) {
      const recordCode = line.substring(0, 4);
      const actualLength = line.length;
      const expectedLength = expectedINILineLength[recordCode];
      if (actualLength !== expectedLength) {
        throw new Error(
          `INI.txt ${recordCode} line length should be ${expectedLength}. Actual ${line.length}`
        );
      }
    }
  }
  validateBeforeSave() {
    this.validateHeader();
    this.validateLength();
  }
  createINIHeader() {
    const getValue = (cell) => {
      var _a, _b;
      return (_b = (_a = this.computedValues(cell)) != null ? _a : getNestedValue(this.input, cell.name)) != null ? _b : cell.default;
    };
    this.createRow(iniSchema.header, getValue, void 0);
  }
  createINIBody() {
    for (const [recordCode, sum] of Object.entries(
      __privateGet(this, _BKMVDATARowsCount)
    )) {
      let line = recordCode;
      const countCellSchema = iniSchema.summaryRow.cells[1];
      line += padByType(countCellSchema.type, sum, countCellSchema.length);
      this.lines.push(line);
    }
  }
  create() {
    this.createINIHeader();
    this.createINIBody();
  }
};
_BKMVDATARowsCount = new WeakMap();

// src/schemas/C100Schema.ts
var C100Schema = {
  cells: [
    {
      fieldId: 1200,
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      type: "string",
      length: 4,
      startAt: 1,
      endAt: 4,
      required: true,
      default: "C100"
    },
    {
      fieldId: 1201,
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      type: "number",
      length: 9,
      startAt: 5,
      endAt: 13,
      required: true
    },
    {
      fieldId: 1202,
      name: "business.taxId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      type: "number",
      length: 9,
      startAt: 14,
      endAt: 22,
      required: true
    },
    {
      fieldId: 1203,
      name: "documentType",
      description: "\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA",
      type: "number",
      length: 3,
      startAt: 23,
      endAt: 25,
      required: true
    },
    {
      fieldId: 1204,
      name: "documentNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05DE\u05E1\u05DE\u05DA",
      type: "string",
      length: 20,
      startAt: 26,
      endAt: 45,
      required: true
    },
    {
      fieldId: 1205,
      name: "documentCreationDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E4\u05E7\u05EA \u05DE\u05E1\u05DE\u05DA",
      type: "date",
      length: 8,
      startAt: 46,
      endAt: 53,
      required: true,
      validator: isValidDate
    },
    {
      fieldId: 1206,
      name: "documentCreationTime",
      description: "\u05E9\u05E2\u05EA \u05D4\u05E4\u05E7\u05EA \u05DE\u05E1\u05DE\u05DA",
      type: "time",
      length: 4,
      startAt: 54,
      endAt: 57,
      required: true
    },
    {
      fieldId: 1207,
      name: "customerOrVendor.name",
      description: "\u05E9\u05DD \u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7",
      type: "string",
      length: 50,
      startAt: 58,
      endAt: 107,
      required: (input, item) => {
        return item.documentType >= 100 && item.documentType <= 710;
      }
    },
    {
      fieldId: 1208,
      name: "customerOrVendor.address.street",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05E8\u05D7\u05D5\u05D1",
      type: "string",
      length: 50,
      startAt: 108,
      endAt: 157,
      required: false
    },
    {
      fieldId: 1209,
      name: "customerOrVendor.address.houseNumber",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05DE\u05E1 \u05D1\u05D9\u05EA",
      type: "string",
      length: 10,
      startAt: 158,
      endAt: 167,
      required: false
    },
    {
      fieldId: 1210,
      name: "customerOrVendor.address.city",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05E2\u05D9\u05E8",
      type: "string",
      length: 30,
      startAt: 168,
      endAt: 197,
      required: false
    },
    {
      fieldId: 1211,
      name: "customerOrVendor.address.zipCode",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05DE\u05D9\u05E7\u05D5\u05D3",
      type: "string",
      length: 8,
      startAt: 198,
      endAt: 205,
      required: false
    },
    {
      fieldId: 1212,
      name: "customerOrVendor.address.country",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05DE\u05D3\u05D9\u05E0\u05D4",
      type: "string",
      length: 30,
      startAt: 206,
      endAt: 235,
      required: false
    },
    {
      fieldId: 1213,
      name: "customerOrVendor.address.countryCode",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05E7\u05D5\u05D3 \u05DE\u05D3\u05D9\u05E0\u05D4",
      type: "string",
      length: 2,
      startAt: 236,
      endAt: 237,
      required: false
    },
    {
      fieldId: 1214,
      name: "customerOrVendor.phone",
      description: "\u05D8\u05DC\u05E4\u05D5\u05DF \u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7",
      type: "string",
      length: 15,
      startAt: 238,
      endAt: 252,
      required: false
    },
    {
      fieldId: 1215,
      name: "customerOrVendor.taxId",
      description: "\u05DE\u05E1 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4 \u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7",
      type: "number",
      length: 9,
      startAt: 253,
      endAt: 261,
      required: false
    },
    {
      fieldId: 1216,
      name: "valueDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E2\u05E8\u05DA",
      type: "date",
      length: 8,
      startAt: 262,
      endAt: 269,
      required: true,
      validator: isValidDate
    },
    {
      fieldId: 1217,
      name: "finalSumInForeignCurrency",
      description: '\u05E1\u05DB\u05D5\u05DD \u05E1\u05D5\u05E4\u05D9 \u05E9\u05DC \u05D4\u05DE\u05E1\u05DE\u05DA \u05D1\u05DE\u05D8"\u05D7',
      type: "positive",
      length: 15,
      startAt: 270,
      endAt: 284,
      decimalPlaces: 2,
      required: false
    },
    {
      fieldId: 1218,
      name: "currencyCode",
      description: '\u05E7\u05D5\u05D3 \u05DE\u05D8"\u05D7',
      type: "string",
      length: 3,
      startAt: 285,
      endAt: 287,
      required: false,
      validator: isOptionalValidCurrencyCode
    },
    {
      fieldId: 1219,
      name: "documentSumBeforeDiscount",
      description: "\u05E1\u05DB\u05D5\u05DD \u05D4\u05DE\u05E1\u05DE\u05DA \u05DC\u05E4\u05E0\u05D9 \u05D4\u05E0\u05D7\u05EA \u05DE\u05E1\u05DE\u05DA",
      type: "positive",
      length: 15,
      startAt: 288,
      endAt: 302,
      decimalPlaces: 2,
      required: true,
      validator: (value, item) => {
        if (!value)
          return false;
        const expected = item.items.reduce(
          (acc, item2) => acc + +item2.lineTotal,
          0
        );
        return +value === expected || `documentSumBeforeDiscount should be ${expected} (accumulation of the doc's items lineTotal) but got ${value}`;
      }
    },
    {
      fieldId: 1220,
      name: "discount",
      description: "\u05D4\u05E0\u05D7\u05EA \u05DE\u05E1\u05DE\u05DA",
      type: "negative",
      length: 15,
      startAt: 303,
      endAt: 317,
      decimalPlaces: 2,
      required: true
    },
    {
      fieldId: 1221,
      name: "documentSumAfterDiscountExcludingVat",
      description: '\u05E1\u05DB\u05D5\u05DD \u05D4\u05DE\u05E1\u05DE\u05DA \u05DC\u05D0\u05D7\u05E8 \u05D4\u05E0\u05D7\u05D5\u05EA \u05DC\u05DC\u05D0 \u05DE\u05E2"\u05DE',
      type: "positive",
      length: 15,
      startAt: 318,
      endAt: 332,
      decimalPlaces: 2,
      required: true,
      validator: (value, item) => {
        var _a;
        const beforeDiscount = +item.documentSumBeforeDiscount;
        const discount = +((_a = item.discount) != null ? _a : 0);
        const expected = beforeDiscount - discount;
        return value === `${expected}` || `documentSumAfterDiscountExcludingVat (${value}) must be equal to documentSumBeforeDiscount (${beforeDiscount}) - discount (${discount}) = ${expected}`;
      }
    },
    {
      fieldId: 1222,
      name: "vatSum",
      description: '\u05E1\u05DB\u05D5\u05DD \u05D4\u05DE\u05E2"\u05DE',
      type: "positive",
      length: 15,
      startAt: 333,
      endAt: 347,
      decimalPlaces: 2,
      required: true
    },
    {
      fieldId: 1223,
      name: "documentSumIncludingVat",
      description: '\u05E1\u05DB\u05D5\u05DD \u05D4\u05DE\u05E1\u05DE\u05DA \u05DB\u05D5\u05DC\u05DC \u05DE\u05E2"\u05DE',
      type: "positive",
      length: 15,
      startAt: 348,
      endAt: 362,
      decimalPlaces: 2,
      required: true,
      validator: (value, item) => {
        var _a, _b;
        const vatSum = +((_a = item.vatSum) != null ? _a : 0);
        const documentSumAfterDiscountExcludingVat = +((_b = item.documentSumAfterDiscountExcludingVat) != null ? _b : 0);
        const expected = documentSumAfterDiscountExcludingVat + vatSum;
        return value === `${expected}` || "documentSumIncludingVat must be equal to documentSumAfterDiscountExcludingVat + vatSum";
      }
    },
    {
      fieldId: 1224,
      name: "deductionAtSourceSum",
      description: "\u05E1\u05DB\u05D5\u05DD \u05D4\u05E0\u05D9\u05DB\u05D5\u05D9 \u05D1\u05DE\u05E7\u05D5\u05E8",
      type: "positive",
      length: 12,
      startAt: 363,
      endAt: 374,
      decimalPlaces: 2,
      required: true
    },
    {
      fieldId: 1225,
      name: "customerOrVendor.key",
      description: "\u05DE\u05E4\u05EA\u05D7 \u05D4\u05DC\u05E7\u05D5\u05D7 \u05D0\u05E6\u05DC \u05D4\u05DE\u05D5\u05DB\u05E8 \u05D0\u05D5 \u05DE\u05E4\u05EA\u05D7 \u05D4\u05E1\u05E4\u05E7 \u05D0\u05E6\u05DC \u05D4\u05E7\u05D5\u05E0\u05D4",
      type: "string",
      length: 15,
      startAt: 375,
      endAt: 389,
      required: (input, item) => {
        return item.documentType >= 100 && item.documentType <= 710;
      }
    },
    {
      fieldId: 1226,
      name: "matchingField",
      description: "\u05E9\u05D3\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4",
      type: "string",
      length: 10,
      startAt: 390,
      endAt: 399,
      required: false
    },
    {
      fieldId: 1228,
      name: "isCanceled",
      description: "\u05DE\u05E1\u05DE\u05DA \u05DE\u05D1\u05D5\u05D8\u05DC",
      type: "boolean",
      // 1
      length: 1,
      startAt: 400,
      endAt: 400,
      required: false
    },
    {
      fieldId: 1230,
      name: "documentDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05DE\u05E1\u05DE\u05DA",
      type: "date",
      length: 8,
      startAt: 401,
      endAt: 408,
      required: true,
      validator: isValidDate
    },
    {
      fieldId: 1231,
      name: "business.branchId",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E0\u05D9\u05E3/\u05E2\u05E0\u05E3",
      type: "string",
      length: 7,
      startAt: 409,
      endAt: 415,
      required: false
    },
    {
      fieldId: 1233,
      name: "actionCode",
      description: "\u05DE\u05D1\u05E6\u05E2 \u05D4\u05E4\u05E2\u05D5\u05DC\u05D4",
      type: "string",
      length: 9,
      startAt: 416,
      endAt: 424,
      required: false
    },
    {
      fieldId: 1234,
      name: "linkField",
      description: "\u05E9\u05D3\u05D4 \u05DE\u05E7\u05E9\u05E8 \u05DC\u05E9\u05D5\u05E8\u05D4",
      type: "number",
      length: 7,
      startAt: 425,
      endAt: 431,
      required: true
    },
    {
      fieldId: 1235,
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      type: "string",
      length: 13,
      startAt: 432,
      endAt: 444,
      required: false
    }
  ]
};

// src/schemas/D110Schema.ts
var D110Schema = {
  cells: [
    {
      default: "D110",
      required: true,
      length: 4,
      startAt: 1,
      endAt: 4,
      type: "string",
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      fieldId: 1250
    },
    {
      required: true,
      length: 9,
      startAt: 5,
      endAt: 13,
      type: "number",
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      fieldId: 1251
    },
    {
      required: true,
      length: 9,
      startAt: 14,
      endAt: 22,
      type: "number",
      name: "business.taxId",
      description: "\u05DE\u05E1 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      fieldId: 1252
    },
    {
      required: true,
      length: 3,
      startAt: 23,
      endAt: 25,
      type: "number",
      name: "documentType",
      description: "\u05E1\u05D5\u05D2 \u05D4\u05DE\u05E1\u05DE\u05DA",
      fieldId: 1253
    },
    {
      required: true,
      length: 20,
      startAt: 26,
      endAt: 45,
      type: "string",
      name: "documentNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05D4\u05DE\u05E1\u05DE\u05DA",
      fieldId: 1254
    },
    {
      required: true,
      length: 4,
      startAt: 46,
      endAt: 49,
      type: "number",
      name: "lineNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E9\u05D5\u05E8\u05D4 \u05D1\u05DE\u05E1\u05DE\u05DA",
      fieldId: 1255
    },
    {
      required: false,
      length: 3,
      startAt: 50,
      endAt: 52,
      type: "number",
      name: "documentTypeBase",
      description: "\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA \u05D1\u05E1\u05D9\u05E1",
      fieldId: 1256
    },
    {
      required: false,
      length: 20,
      startAt: 53,
      endAt: 72,
      type: "string",
      name: "documentNumberBase",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05DE\u05E1\u05DE\u05DA \u05D1\u05E1\u05D9\u05E1",
      fieldId: 1257
    },
    {
      required: true,
      length: 1,
      startAt: 73,
      endAt: 73,
      type: "number",
      name: "transactionType",
      description: "\u05E1\u05D5\u05D2 \u05E2\u05E1\u05E7\u05D4",
      fieldId: 1258
    },
    {
      required: false,
      length: 20,
      startAt: 74,
      endAt: 93,
      type: "string",
      name: "catalogId",
      description: '\u05DE\u05E7"\u05D8 \u05E4\u05E0\u05D9\u05DE\u05D9',
      fieldId: 1259
    },
    {
      required: true,
      length: 30,
      startAt: 94,
      endAt: 123,
      type: "string",
      name: "description",
      description: "\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D4\u05D8\u05D5\u05D1\u05D9\u05DF \u05E9\u05E0\u05DE\u05DB\u05E8 \u05D0\u05D5\n\u05D4\u05E9\u05D9\u05E8\u05D5\u05EA \u05E9\u05E0\u05D9\u05EA\u05DF",
      fieldId: 1260
    },
    {
      required: false,
      length: 50,
      startAt: 124,
      endAt: 173,
      type: "string",
      name: "manufacturerName",
      description: "\u05E9\u05DD \u05D4\u05D9\u05E6\u05E8\u05DF",
      fieldId: 1261
    },
    {
      required: false,
      length: 30,
      startAt: 174,
      endAt: 203,
      type: "string",
      name: "manufacturerSerialNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E1\u05D9\u05D3\u05D5\u05E8\u05D9 \u05E9\u05DC \u05D4\u05DE\u05D5\u05E6\u05E8 \u05D4\u05DE\u05D5\u05D8\u05D1\u05E2 \u05E2\u05DC \u05D4\u05DE\u05D5\u05E6\u05E8 \u05E2\u05DC \u05D9\u05D3\u05D9\n\u05D4\u05D9\u05E6\u05E8\u05DF",
      fieldId: 1262
    },
    {
      default: "\u05D9\u05D7\u05D9\u05D3\u05D4",
      required: false,
      length: 20,
      startAt: 204,
      endAt: 223,
      type: "string",
      name: "unitOfMeasure",
      description: "\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D9\u05D7\u05D9\u05D3\u05EA \u05D4\u05DE\u05D9\u05D3\u05D4",
      fieldId: 1263
    },
    {
      required: true,
      length: 17,
      startAt: 224,
      endAt: 240,
      decimalPlaces: 4,
      type: "positive",
      name: "quantity",
      description: "\u05D4\u05DB\u05DE\u05D5\u05EA",
      fieldId: 1264
    },
    {
      required: true,
      length: 15,
      startAt: 241,
      endAt: 255,
      decimalPlaces: 2,
      type: "positive",
      name: "unitPriceExcludingVAT",
      description: '\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D9\u05D7\u05D9\u05D3\u05D4 \u05DC\u05DC\u05D0 \u05DE\u05E2"\u05DE',
      fieldId: 1265
    },
    {
      default: "0",
      required: false,
      length: 15,
      startAt: 256,
      endAt: 270,
      decimalPlaces: 2,
      type: "negative",
      name: "lineDiscount",
      description: "\u05D4\u05E0\u05D7\u05EA \u05E9\u05D5\u05E8\u05D4",
      fieldId: 1266,
      validator: (value, item) => {
        const { quantity, unitPriceExcludingVAT } = item;
        const expected = +quantity * +unitPriceExcludingVAT;
        return +(value != null ? value : 0) < expected || `[1266:lineDiscount] lineDiscount can't be bigger than ${expected}. Got ${value}`;
      }
    },
    {
      required: true,
      length: 15,
      startAt: 271,
      endAt: 285,
      decimalPlaces: 2,
      type: "positive",
      name: "lineTotal",
      description: "\u05E1\u05DA \u05E1\u05DB\u05D5\u05DD \u05DC\u05E9\u05D5\u05E8\u05D4",
      fieldId: 1267,
      validator: (value, item) => {
        const { quantity, unitPriceExcludingVAT, lineDiscount } = item;
        const expected = +quantity * +unitPriceExcludingVAT - +(lineDiscount != null ? lineDiscount : 0);
        return value === `${expected}` || `[1267:lineTotal] Expected ${expected}. Got ${value}`;
      }
    },
    {
      required: true,
      length: 4,
      startAt: 286,
      endAt: 289,
      decimalPlaces: 2,
      type: "number",
      name: "lineVATRate",
      description: '\u05E9\u05D9\u05E2\u05D5\u05E8 \u05D4\u05DE\u05E2"\u05DE \u05D1\u05E9\u05D5\u05E8\u05D4',
      fieldId: 1268
    },
    {
      required: (input) => input.business.hasBranches === 1 /* YES */,
      length: 7,
      startAt: 290,
      endAt: 296,
      type: "string",
      name: "business.branchId",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E0\u05D9\u05E3/\u05E2\u05E0\u05E3",
      fieldId: 1270
    },
    {
      required: true,
      length: 8,
      startAt: 297,
      endAt: 304,
      type: "date",
      name: "documentDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05DE\u05E1\u05DE\u05DA",
      fieldId: 1272,
      validator: isValidDate
    },
    {
      required: true,
      length: 7,
      startAt: 305,
      endAt: 311,
      type: "number",
      name: "linkField",
      description: "\u05E9\u05D3\u05D4 \u05DE\u05E7\u05E9\u05E8 \u05DC\u05DB\u05D5\u05EA\u05E8\u05EA",
      fieldId: 1273
    },
    {
      required: (input) => input.business.hasBranches === 1 /* YES */,
      length: 7,
      startAt: 312,
      endAt: 318,
      type: "string",
      name: "business.branchId",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E0\u05D9\u05E3/\u05E2\u05E0\u05E3 \u05DC\u05DE\u05E1\u05DE\u05DA\n\u05D1\u05E1\u05D9\u05E1",
      fieldId: 1274
    },
    {
      required: false,
      length: 21,
      startAt: 319,
      endAt: 339,
      type: "string",
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      fieldId: 1275
    }
  ]
};

// src/schemas/D120Schema.ts
var requiredWhen = (fieldId, fieldName, when) => {
  return `[${fieldId}:${fieldName}] is required when ${when}`;
};
var requiredWhenCheck = (fieldId, fieldName) => {
  return requiredWhen(
    fieldId,
    fieldName,
    "paymentMethod is PaymentMethod.CHECK"
  );
};
var requiredWhenCreditCard = (fieldId, fieldName) => {
  return requiredWhen(
    fieldId,
    fieldName,
    "paymentMethod is PaymentMethod.CREDIT_CARD"
  );
};
var requiredWhenCheckOrCreditCard = (fieldId, fieldName) => {
  return requiredWhen(
    fieldId,
    fieldName,
    "paymentMethod is PaymentMethod.CHECK or PaymentMethod.CREDIT_CARD"
  );
};
var D120Schema = {
  cells: [
    {
      default: "D120",
      required: true,
      length: 4,
      startAt: 1,
      endAt: 4,
      type: "string",
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      fieldId: 1300
    },
    {
      required: true,
      length: 9,
      startAt: 5,
      endAt: 13,
      type: "number",
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      fieldId: 1301
    },
    {
      required: true,
      length: 9,
      startAt: 14,
      endAt: 22,
      type: "number",
      name: "business.taxId",
      description: "\u05DE\u05E1 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      fieldId: 1302
    },
    {
      required: true,
      length: 3,
      startAt: 23,
      endAt: 25,
      type: "number",
      name: "documentType",
      description: "\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA",
      fieldId: 1303
    },
    {
      required: true,
      length: 20,
      startAt: 26,
      endAt: 45,
      type: "string",
      name: "documentNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05DE\u05E1\u05DE\u05DA",
      fieldId: 1304
    },
    {
      required: true,
      length: 4,
      startAt: 46,
      endAt: 49,
      type: "number",
      name: "lineNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E9\u05D5\u05E8\u05D4 \u05D1\u05DE\u05E1\u05DE\u05DA",
      fieldId: 1305
    },
    {
      required: true,
      length: 1,
      startAt: 50,
      endAt: 50,
      type: "number",
      name: "paymentMethod",
      description: "\u05E1\u05D5\u05D2 \u05D0\u05DE\u05E6\u05E2\u05D9 \u05D4\u05EA\u05E9\u05DC\u05D5\u05DD",
      fieldId: 1306
    },
    {
      required: (input, item) => item.paymentMethod === 2 /* CHECK */ ? requiredWhenCheck(1307, "bankId") : false,
      length: 10,
      startAt: 51,
      endAt: 60,
      type: "number",
      name: "bankId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05D4\u05D1\u05E0\u05E7",
      fieldId: 1307
    },
    {
      required: (input, item) => item.paymentMethod === 2 /* CHECK */ ? requiredWhenCheck(1308, "branchId") : false,
      length: 10,
      startAt: 61,
      endAt: 70,
      type: "number",
      name: "branchId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05D4\u05E1\u05E0\u05D9\u05E3",
      fieldId: 1308
    },
    {
      required: (input, item) => item.paymentMethod === 2 /* CHECK */ ? requiredWhenCheck(1309, "accountNumber") : false,
      length: 15,
      startAt: 71,
      endAt: 85,
      type: "number",
      name: "accountNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05D7\u05E9\u05D1\u05D5\u05DF",
      fieldId: 1309
    },
    {
      required: (input, item) => item.paymentMethod === 2 /* CHECK */ ? requiredWhenCheck(1310, "checkNumber") : false,
      length: 10,
      startAt: 86,
      endAt: 95,
      type: "number",
      name: "checkNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05D4\u05DE\u05D7\u05D0\u05D4",
      fieldId: 1310
    },
    {
      required: (input, item) => item.paymentMethod === 2 /* CHECK */ || item.paymentMethod === 3 /* CREDIT_CARD */ ? requiredWhenCheckOrCreditCard(1311, "paymentDueDate") : false,
      length: 8,
      startAt: 96,
      endAt: 103,
      type: "date",
      name: "paymentDueDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E4\u05D9\u05E8\u05E2\u05D5\u05DF \u05E9\u05DC \u05D4\u05D4\u05DE\u05D7\u05D0\u05D4 /\n\u05D4\u05EA\u05E9\u05DC\u05D5\u05DD",
      fieldId: 1311,
      validator: isOptionalValidDate
    },
    {
      required: true,
      length: 15,
      startAt: 104,
      endAt: 118,
      decimalPlaces: 2,
      type: "positive",
      name: "amount",
      description: "\u05E1\u05DB\u05D5\u05DD \u05D4\u05E9\u05D5\u05E8\u05D4",
      fieldId: 1312
    },
    {
      required: (input, item) => item.paymentMethod === 3 /* CREDIT_CARD */ ? requiredWhenCreditCard(1313, "creditCardCompany") : false,
      length: 1,
      startAt: 119,
      endAt: 119,
      type: "number",
      name: "creditCardCompany",
      description: "\u05E7\u05D5\u05D3 \u05D4\u05D7\u05D1\u05E8\u05D4 \u05D4\u05E1\u05D5\u05DC\u05E7\u05EA",
      fieldId: 1313
    },
    {
      required: (input, item) => item.paymentMethod === 3 /* CREDIT_CARD */ ? requiredWhenCreditCard(1314, "creditCardName") : false,
      length: 20,
      startAt: 120,
      endAt: 139,
      type: "string",
      name: "creditCardName",
      description: "\u05E9\u05DD \u05D4\u05DB\u05E8\u05D8\u05D9\u05E1 \u05D4\u05E0\u05E1\u05DC\u05E7",
      fieldId: 1314
    },
    {
      required: (input, item) => item.paymentMethod === 3 /* CREDIT_CARD */ ? requiredWhenCreditCard(1315, "creditCardTransactionType") : false,
      length: 1,
      startAt: 140,
      endAt: 140,
      type: "number",
      name: "creditCardTransactionType",
      description: "\u05E1\u05D5\u05D2 \u05E2\u05E1\u05E7\u05EA \u05D4\u05D0\u05E9\u05E8\u05D0\u05D9",
      fieldId: 1315
    },
    {
      required: (input) => input.business.hasBranches === 1 /* YES */,
      length: 7,
      startAt: 141,
      endAt: 147,
      type: "string",
      name: "business.branchId",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E0\u05D9\u05E3/\u05E2\u05E0\u05E3",
      fieldId: 1320
    },
    {
      required: true,
      length: 8,
      startAt: 148,
      endAt: 155,
      type: "date",
      name: "documentDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05DE\u05E1\u05DE\u05DA",
      fieldId: 1322,
      validator: isValidDate
    },
    {
      required: true,
      length: 7,
      startAt: 156,
      endAt: 162,
      type: "number",
      name: "linkField",
      description: "\u05E9\u05D3\u05D4 \u05DE\u05E7\u05E9\u05E8 \u05DC\u05DB\u05D5\u05EA\u05E8\u05EA",
      fieldId: 1323
    },
    {
      required: false,
      length: 60,
      startAt: 163,
      endAt: 222,
      type: "string",
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      fieldId: 1324
    }
  ]
};

// src/schemas/B100Schema.ts
var B100Schema = {
  cells: [
    {
      default: "B100",
      required: true,
      length: 4,
      startAt: 1,
      endAt: 4,
      type: "string",
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      fieldId: 1350
    },
    {
      required: true,
      length: 9,
      startAt: 5,
      endAt: 13,
      type: "number",
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      fieldId: 1351
    },
    {
      required: true,
      length: 9,
      startAt: 14,
      endAt: 22,
      type: "number",
      name: "business.taxId",
      description: "\u05DE\u05E1 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      fieldId: 1352
    },
    {
      required: true,
      length: 10,
      startAt: 23,
      endAt: 32,
      type: "number",
      name: "transactionNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05EA\u05E0\u05D5\u05E2\u05D4",
      fieldId: 1353
    },
    {
      required: true,
      length: 5,
      startAt: 33,
      endAt: 37,
      type: "number",
      name: "transactionLineNumber",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E9\u05D5\u05E8\u05D4 \u05D1\u05EA\u05E0\u05D5\u05E2\u05D4",
      fieldId: 1354
    },
    {
      required: false,
      length: 8,
      startAt: 38,
      endAt: 45,
      type: "number",
      name: "dish",
      description: "\u05DE\u05E0\u05D4",
      fieldId: 1355
    },
    {
      required: false,
      length: 15,
      startAt: 46,
      endAt: 60,
      type: "string",
      name: "transactionType",
      description: "\u05E1\u05D5\u05D2 \u05EA\u05E0\u05D5\u05E2\u05D4",
      fieldId: 1356
    },
    {
      required: false,
      length: 20,
      startAt: 61,
      endAt: 80,
      type: "string",
      name: "reference",
      description: "\u05D0\u05E1\u05DE\u05DB\u05EA\u05D0",
      fieldId: 1357
    },
    {
      required: false,
      length: 3,
      startAt: 81,
      endAt: 83,
      type: "number",
      name: "referenceDocumentType",
      description: "\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA \u05D4\u05D0\u05E1\u05DE\u05DB\u05EA\u05D0",
      fieldId: 1358
    },
    {
      required: false,
      length: 20,
      startAt: 84,
      endAt: 103,
      type: "string",
      name: "reference2",
      description: "\u05D0\u05E1\u05DE\u05DB\u05EA\u05D0 2",
      fieldId: 1359
    },
    {
      required: false,
      length: 3,
      startAt: 104,
      endAt: 106,
      type: "number",
      name: "reference2DocumentType",
      description: "\u05E1\u05D5\u05D2 \u05DE\u05E1\u05DE\u05DA \u05D4\u05D0\u05E1\u05DE\u05DB\u05EA\u05D0\n2",
      fieldId: 1360
    },
    {
      required: false,
      length: 50,
      startAt: 107,
      endAt: 156,
      type: "string",
      name: "details",
      description: "\u05E4\u05E8\u05D8\u05D9\u05DD",
      fieldId: 1361
    },
    {
      required: true,
      length: 8,
      startAt: 157,
      endAt: 164,
      type: "date",
      name: "date",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA",
      fieldId: 1362,
      validator: isValidDate
    },
    {
      required: true,
      length: 8,
      startAt: 165,
      endAt: 172,
      type: "date",
      name: "valueDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E2\u05E8\u05DA",
      fieldId: 1363,
      validator: isValidDate
    },
    {
      required: false,
      length: 15,
      startAt: 173,
      endAt: 187,
      type: "string",
      name: "accountKey",
      description: "\u05D7\u05E9\u05D1\u05D5\u05DF \u05D1\u05EA\u05E0\u05D5\u05E2\u05D4",
      fieldId: 1364
    },
    {
      required: false,
      length: 15,
      startAt: 188,
      endAt: 202,
      type: "string",
      name: "contraAccountKey",
      description: "\u05D7\u05E9\u05D1\u05D5\u05DF \u05E0\u05D2\u05D3\u05D9",
      fieldId: 1365
    },
    {
      required: true,
      length: 1,
      startAt: 203,
      endAt: 203,
      type: "number",
      name: "actionType",
      description: "\u05E1\u05D9\u05DE\u05DF \u05D4\u05E4\u05E2\u05D5\u05DC\u05D4",
      fieldId: 1366
    },
    {
      required: true,
      length: 3,
      startAt: 204,
      endAt: 206,
      type: "string",
      name: "currencyCode",
      description: "\u05E7\u05D5\u05D3 \u05DE\u05D8\u05D1\u05E2 \u05DE\u05D8\u05D7",
      fieldId: 1367,
      validator: isValidCurrencyCode
    },
    {
      default: "0",
      required: false,
      length: 15,
      startAt: 207,
      endAt: 221,
      decimalPlaces: 2,
      type: "positive",
      name: "amount",
      description: "\u05E1\u05DB\u05D5\u05DD \u05D4\u05E4\u05E2\u05D5\u05DC\u05D4",
      fieldId: 1368
    },
    {
      default: "0",
      required: false,
      length: 15,
      startAt: 222,
      endAt: 236,
      decimalPlaces: 2,
      type: "positive",
      name: "foreignCurrencyAmount",
      description: "\u05E1\u05DB\u05D5\u05DD \u05DE\u05D8\u05D7",
      fieldId: 1369
    },
    {
      required: false,
      length: 12,
      startAt: 237,
      endAt: 248,
      decimalPlaces: 2,
      type: "string",
      name: "quantity",
      description: "\u05E9\u05D3\u05D4 \u05DB\u05DE\u05D5\u05EA",
      fieldId: 1370
    },
    {
      required: false,
      length: 10,
      startAt: 249,
      endAt: 258,
      type: "string",
      name: "matchField1",
      description: "\u05E9\u05D3\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4 1",
      fieldId: 1371
    },
    {
      required: false,
      length: 10,
      startAt: 259,
      endAt: 268,
      type: "string",
      name: "matchField2",
      description: "\u05E9\u05D3\u05D4 \u05D4\u05EA\u05D0\u05DE\u05D4 2",
      fieldId: 1372
    },
    {
      required: (input) => input.business.hasBranches === 1 /* YES */,
      length: 7,
      startAt: 269,
      endAt: 275,
      type: "string",
      name: "business.branchId",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E0\u05D9\u05E3/\u05E2\u05E0\u05E3",
      fieldId: 1374
    },
    {
      required: true,
      length: 8,
      startAt: 276,
      endAt: 283,
      type: "date",
      name: "entryDate",
      description: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05D6\u05E0\u05D4",
      fieldId: 1375,
      validator: isValidDate
    },
    {
      required: false,
      length: 9,
      startAt: 284,
      endAt: 292,
      type: "string",
      name: "userWhoMadeTheAction",
      description: "\u05DE\u05D1\u05E6\u05E2 \u05E4\u05E2\u05D5\u05DC\u05D4",
      fieldId: 1376
    },
    {
      required: false,
      length: 25,
      startAt: 293,
      endAt: 317,
      type: "string",
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      fieldId: 1377
    }
  ]
};

// src/schemas/B110Schema.ts
var B110Schema = {
  cells: [
    {
      default: "B110",
      required: true,
      length: 4,
      startAt: 1,
      endAt: 4,
      type: "string",
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      fieldId: 1400
    },
    {
      required: true,
      length: 9,
      startAt: 5,
      endAt: 13,
      type: "number",
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      fieldId: 1401
    },
    {
      required: true,
      length: 9,
      startAt: 14,
      endAt: 22,
      type: "number",
      name: "business.taxId",
      description: "\u05DE\u05E1 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      fieldId: 1402
    },
    {
      required: true,
      length: 15,
      startAt: 23,
      endAt: 37,
      type: "string",
      name: "accountKey",
      description: "\u05DE\u05E4\u05EA\u05D7 \u05D4\u05D7\u05E9\u05D1\u05D5\u05DF",
      fieldId: 1403
    },
    {
      required: true,
      length: 50,
      startAt: 38,
      endAt: 87,
      type: "string",
      name: "accountName",
      description: "\u05E9\u05DD \u05D4\u05D7\u05E9\u05D1\u05D5\u05DF",
      fieldId: 1404
    },
    {
      required: true,
      length: 15,
      startAt: 88,
      endAt: 102,
      type: "string",
      name: "accountBalanceCode",
      description: "\u05E7\u05D5\u05D3 \u05DE\u05D0\u05D6\u05DF \u05D1\u05D5\u05D7\u05DF",
      fieldId: 1405
    },
    {
      required: true,
      length: 30,
      startAt: 103,
      endAt: 132,
      type: "string",
      name: "accountBalanceCodeDescription",
      description: "\u05EA\u05D9\u05D0\u05D5\u05E8 \u05E7\u05D5\u05D3 \u05DE\u05D0\u05D6\u05DF \u05D1\u05D5\u05D7\u05DF",
      fieldId: 1406
    },
    {
      required: false,
      length: 50,
      startAt: 133,
      endAt: 182,
      type: "string",
      name: "address.street",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05E8\u05D7\u05D5\u05D1",
      fieldId: 1407
    },
    {
      required: false,
      length: 10,
      startAt: 183,
      endAt: 192,
      type: "string",
      name: "address.houseNumber",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05DE\u05E1\u05E4\u05E8 \u05D1\u05D9\u05EA",
      fieldId: 1408
    },
    {
      required: false,
      length: 30,
      startAt: 193,
      endAt: 222,
      type: "string",
      name: "address.city",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05E2\u05D9\u05E8",
      fieldId: 1409
    },
    {
      required: false,
      length: 8,
      startAt: 223,
      endAt: 230,
      type: "string",
      name: "address.zipCode",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05DE\u05D9\u05E7\u05D5\u05D3",
      fieldId: 1410
    },
    {
      required: false,
      length: 30,
      startAt: 231,
      endAt: 260,
      type: "string",
      name: "address.country",
      description: "\u05DE\u05E2\u05DF \u05D4\u05DC\u05E7\u05D5\u05D7/\u05E1\u05E4\u05E7 - \u05DE\u05D3\u05D9\u05E0\u05D4",
      fieldId: 1411
    },
    {
      required: false,
      length: 2,
      startAt: 261,
      endAt: 262,
      type: "string",
      name: "address.countryCode",
      description: "\u05E7\u05D5\u05D3 \u05DE\u05D3\u05D9\u05E0\u05D4",
      fieldId: 1412
    },
    {
      required: false,
      length: 15,
      startAt: 263,
      endAt: 277,
      type: "string",
      name: "centerAccount",
      description: "\u05D7\u05E9\u05D1\u05D5\u05DF \u05DE\u05E8\u05DB\u05D6",
      fieldId: 1413
    },
    {
      required: true,
      length: 15,
      startAt: 278,
      endAt: 292,
      decimalPlaces: 2,
      type: "positive",
      name: "openingBalance",
      description: "\u05D9\u05EA\u05E8\u05EA \u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u05D1\u05EA\u05D7\u05D9\u05DC\u05EA \u05D4\u05D7\u05EA\u05DA",
      fieldId: 1414
    },
    {
      required: true,
      length: 15,
      startAt: 293,
      endAt: 307,
      decimalPlaces: 2,
      type: "positive",
      name: "totalDebit",
      description: '\u05E1\u05D4"\u05DB \u05D7\u05D5\u05D1\u05D4',
      fieldId: 1415
    },
    {
      required: true,
      length: 15,
      startAt: 308,
      endAt: 322,
      decimalPlaces: 2,
      type: "positive",
      name: "totalCredit",
      description: '\u05E1\u05D4"\u05DB \u05D6\u05DB\u05D5\u05EA',
      fieldId: 1416
    },
    {
      required: false,
      length: 4,
      startAt: 323,
      endAt: 326,
      type: "number",
      name: "govClassificationCode",
      description: "\u05E7\u05D5\u05D3 \u05D1\u05E1\u05D9\u05D5\u05D5\u05D2 \u05D4\u05D7\u05E9\u05D1\u05D5\u05E0\u05D0\u05D9",
      fieldId: 1417
    },
    {
      required: (input) => input.software.accountingType === 2 /* doubleEntry */,
      length: 9,
      startAt: 327,
      endAt: 335,
      type: "number",
      name: "customerOrVendorTaxId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E2\u05D5\u05E1\u05E7 \u05E9\u05DC \u05E1\u05E4\u05E7/\u05DC\u05E7\u05D5\u05D7",
      fieldId: 1419
    },
    {
      required: (input) => input.business.hasBranches === 1 /* YES */,
      length: 7,
      startAt: 336,
      endAt: 342,
      type: "string",
      name: "business.branchId",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E1\u05E0\u05D9\u05E3/\u05E2\u05E0\u05E3",
      fieldId: 1421
    },
    {
      required: false,
      length: 15,
      startAt: 343,
      endAt: 357,
      decimalPlaces: 2,
      type: "positive",
      name: "openingBalanceInForeignCurrency",
      description: '\u05D9\u05EA\u05E8\u05EA \u05D7\u05E9\u05D1\u05D5\u05DF \u05D1\u05EA\u05D7\u05D9\u05DC\u05EA \u05D7\u05EA\u05DA\n\u05D1\u05DE\u05D8"\u05D7',
      fieldId: 1422
    },
    {
      required: false,
      length: 3,
      startAt: 358,
      endAt: 360,
      type: "string",
      name: "currencyCode",
      description: '\u05E7\u05D5\u05D3 \u05DE\u05D8\u05D1\u05E2 \u05D9\u05EA\u05E8\u05EA \u05D4\u05D7\u05E9\u05D1\u05D5\u05DF \u05D1\u05EA\u05D7\u05D9\u05DC\u05EA \u05D7\u05EA\u05DA \u05D1\u05DE\u05D8"\u05D7',
      fieldId: 1423,
      validator: isOptionalValidCurrencyCode
    },
    {
      required: false,
      length: 16,
      startAt: 361,
      endAt: 376,
      type: "string",
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      fieldId: 1424
    }
  ]
};

// src/schemas/M100Schema.ts
var M100Schema = {
  cells: [
    {
      default: "M100",
      required: true,
      length: 4,
      startAt: 1,
      endAt: 4,
      type: "string",
      name: "recordType",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      fieldId: 1450
    },
    {
      required: true,
      length: 9,
      startAt: 5,
      endAt: 13,
      type: "number",
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      fieldId: 1451
    },
    {
      required: true,
      length: 9,
      startAt: 14,
      endAt: 22,
      type: "number",
      name: "business.taxId",
      description: "\u05DE\u05E1 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      fieldId: 1452
    },
    {
      required: false,
      length: 20,
      startAt: 23,
      endAt: 42,
      type: "string",
      name: "universalItemCode",
      description: '\u05DE\u05E7"\u05D8 \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D5\u05E0\u05D9\u05D1\u05E8\u05E1\u05DC\u05D9',
      fieldId: 1453
    },
    {
      required: false,
      length: 20,
      startAt: 43,
      endAt: 62,
      type: "string",
      name: "supplierItemCode",
      description: '\u05DE\u05E7"\u05D8 \u05D4\u05E1\u05E4\u05E7/\u05D9\u05E6\u05E8\u05DF ) \u05D1\u05DE\u05E1\u05DE\u05DB\u05D9 \u05E8\u05DB\u05E9 (',
      fieldId: 1454
    },
    {
      required: true,
      length: 20,
      startAt: 63,
      endAt: 82,
      type: "string",
      name: "internalItemCode",
      description: '\u05DE\u05E7"\u05D8 \u05E4\u05E0\u05D9\u05DE\u05D9',
      fieldId: 1455
    },
    {
      required: true,
      length: 50,
      startAt: 83,
      endAt: 132,
      type: "string",
      name: "itemName",
      description: "\u05E9\u05DD \u05E4\u05E8\u05D9\u05D8",
      fieldId: 1456
    },
    {
      required: false,
      length: 10,
      startAt: 133,
      endAt: 142,
      type: "string",
      name: "sortingCode",
      description: "\u05E7\u05D5\u05D3 \u05DE\u05D9\u05D5\u05DF",
      fieldId: 1457
    },
    {
      required: false,
      length: 30,
      startAt: 143,
      endAt: 172,
      type: "string",
      name: "sortingCodeDescription",
      description: "\u05EA\u05D9\u05D0\u05D5\u05E8 \u05E7\u05D5\u05D3 \u05DE\u05D9\u05D5\u05DF",
      fieldId: 1458
    },
    {
      default: "\u05D9\u05D7\u05D9\u05D3\u05D4",
      required: true,
      length: 20,
      startAt: 173,
      endAt: 192,
      type: "string",
      name: "unitOfMeasure",
      description: "\u05EA\u05D9\u05D0\u05D5\u05E8 \u05D9\u05D7\u05D9\u05D3\u05EA \u05DE\u05D9\u05D3\u05D4",
      fieldId: 1459
    },
    {
      required: true,
      length: 12,
      startAt: 193,
      endAt: 204,
      decimalPlaces: 2,
      type: "string",
      name: "openingBalance",
      description: "\u05D9\u05EA\u05E8\u05EA \u05D4\u05E4\u05E8\u05D9\u05D8 \u05DC\u05EA\u05D7\u05D9\u05DC\u05EA\n\u05D4\u05D7\u05EA\u05DA",
      fieldId: 1460
    },
    {
      required: true,
      length: 12,
      startAt: 205,
      endAt: 216,
      decimalPlaces: 2,
      type: "positive",
      name: "totalEntries",
      description: "\u05E1\u05DA \u05D4\u05DB\u05DC \u05DB\u05E0\u05D9\u05E1\u05D5\u05EA",
      fieldId: 1461
    },
    {
      required: true,
      length: 12,
      startAt: 217,
      endAt: 228,
      decimalPlaces: 2,
      type: "positive",
      name: "totalOutputs",
      description: "\u05E1\u05DA \u05D4\u05DB\u05DC \u05D9\u05E6\u05D9\u05D0\u05D5\u05EA",
      fieldId: 1462
    },
    {
      required: false,
      length: 10,
      startAt: 229,
      endAt: 238,
      decimalPlaces: 2,
      type: "number",
      name: "costPriceOutside",
      description: "\u05DE\u05D7\u05D9\u05E8 \u05E2\u05DC\u05D5\u05EA \u05D1\u05DE\u05DC\u05D0\u05D9 \u05DC\u05E1\u05D5\u05E3 \u05EA\u05E7\u05D5\u05E4\u05EA \u05D4\u05D7\u05EA\u05DA \u05DE\u05D7\u05D5\u05E5 \u05DC\u05DE\u05D7\u05E1\u05E0\u05D9 \u05E2\u05E8\u05D5\u05D1\u05D4",
      fieldId: 1463
    },
    {
      required: false,
      length: 10,
      startAt: 239,
      endAt: 248,
      decimalPlaces: 2,
      type: "number",
      name: "costPrice",
      description: "\u05DE\u05D7\u05D9\u05E8 \u05E2\u05DC\u05D5\u05EA \u05D1\u05DE\u05DC\u05D0\u05D9 \u05DC\u05E1\u05D5\u05E3 \u05EA\u05E7\u05D5\u05E4\u05EA \u05D4\u05D7\u05EA\u05DA \u05D1\u05DE\u05D7\u05E1\u05E0\u05D9\n\u05E2\u05E8\u05D5\u05D1\u05D4",
      fieldId: 1464
    },
    {
      required: false,
      length: 50,
      startAt: 249,
      endAt: 298,
      type: "string",
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      fieldId: 1465
    }
  ]
};

// src/schemas/bkmvdataSchema.ts
var header2 = {
  cells: [
    {
      fieldId: 1100,
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      type: "string",
      length: 4,
      startAt: 1,
      endAt: 4,
      required: true,
      default: "A100"
    },
    {
      fieldId: 1101,
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      type: "number",
      length: 9,
      startAt: 5,
      endAt: 13,
      required: true
    },
    {
      fieldId: 1102,
      name: "business.taxId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      type: "number",
      length: 9,
      startAt: 14,
      endAt: 22,
      required: true
    },
    {
      fieldId: 1103,
      name: "uuid",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E8\u05D0\u05E9\u05D9",
      type: "number",
      length: 15,
      startAt: 23,
      endAt: 37,
      required: true
    },
    {
      fieldId: 1104,
      name: "systemConstant",
      description: "\u05E7\u05D1\u05D5\u05E2 \u05DE\u05E2\u05E8\u05DB\u05EA",
      type: "string",
      length: 8,
      startAt: 38,
      endAt: 45,
      required: true,
      default: "&OF1.31&"
    },
    {
      fieldId: 1105,
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      type: "string",
      length: 50,
      startAt: 46,
      endAt: 95,
      required: false
    }
  ]
};
var footer = {
  cells: [
    {
      fieldId: 1150,
      name: "recordCode",
      description: "\u05E7\u05D5\u05D3 \u05E8\u05E9\u05D5\u05DE\u05D4",
      type: "string",
      length: 4,
      startAt: 1,
      endAt: 4,
      required: true,
      default: "Z900"
    },
    {
      fieldId: 1151,
      name: "runningNumber",
      description: "\u05DE\u05E1 \u05E8\u05E9\u05D5\u05DE\u05D4 \u05D1\u05E7\u05D5\u05D1\u05E5",
      type: "number",
      length: 9,
      startAt: 5,
      endAt: 13,
      required: true
    },
    {
      fieldId: 1152,
      name: "business.taxId",
      description: "\u05DE\u05E1\u05E4\u05E8 \u05E2\u05D5\u05E1\u05E7 \u05DE\u05D5\u05E8\u05E9\u05D4",
      type: "number",
      length: 9,
      startAt: 14,
      endAt: 22,
      required: true
    },
    {
      fieldId: 1153,
      name: "uuid",
      description: "\u05DE\u05D6\u05D4\u05D4 \u05E8\u05D0\u05E9\u05D9",
      type: "number",
      length: 15,
      startAt: 23,
      endAt: 37,
      required: true
    },
    {
      fieldId: 1154,
      name: "systemConstant",
      description: "\u05E7\u05D1\u05D5\u05E2 \u05DE\u05E2\u05E8\u05DB\u05EA",
      type: "string",
      length: 8,
      startAt: 38,
      endAt: 45,
      required: true,
      default: "&OF1.31&"
    },
    {
      fieldId: 1155,
      name: "totalRecords",
      description: "\u05E1\u05DA \u05E8\u05E9\u05D5\u05DE\u05D5\u05EA \u05DB\u05D5\u05DC\u05DC \u05D1\u05E7\u05D5\u05D1\u05E5",
      type: "number",
      length: 15,
      startAt: 46,
      endAt: 60,
      required: true
    },
    {
      fieldId: 1155,
      name: "forFutureData",
      description: "\u05E9\u05D8\u05D7 \u05DC\u05E0\u05EA\u05D5\u05E0\u05D9\u05DD \u05E2\u05EA\u05D9\u05D3\u05D9\u05D9\u05DD",
      type: "string",
      length: 50,
      startAt: 61,
      endAt: 110,
      required: false
    }
  ]
};
var bkmvdataSchema = {
  header: header2,
  footer,
  C100: C100Schema,
  D110: D110Schema,
  D120: D120Schema,
  B100: B100Schema,
  B110: B110Schema,
  M100: M100Schema
};

// src/generator/dataGenerator.ts
var DataGenerator = class extends BaseGenerator {
  constructor(input, uuid, filePath) {
    super(input, uuid, filePath);
  }
  validateHeader() {
    const recordCode = "A100";
    const line = this.lines[0];
    if (!line.startsWith(recordCode)) {
      throw new Error(`BKMVDATA.txt first line should start with ${recordCode}`);
    }
  }
  validateFooter() {
    const recordCode = "Z900";
    const line = this.lines[this.lines.length - 1];
    if (!line.startsWith(recordCode)) {
      throw new Error(`BKMVDATA.txt last line should start with ${recordCode}`);
    }
    const expectedTotalRows = this.lines.length;
    const totalRows = parseInt(line.slice(46, 60));
    if (totalRows !== expectedTotalRows) {
      throw new Error(
        `BKMVDATA.txt last line doesn't have the valid total records. Expected ${expectedTotalRows}, actual ${totalRows}`
      );
    }
  }
  validateLength() {
    for (const line of this.lines) {
      const recordCode = line.substring(0, 4);
      const actualLength = line.length;
      const expectedLength = expectedDATALineLength[recordCode];
      if (actualLength !== expectedLength) {
        throw new Error(
          `BKMVDATA.txt ${recordCode} line length should be ${expectedLength}. Actual ${line.length}`
        );
      }
    }
  }
  validateRunningNumbers() {
    const existingNumbers = /* @__PURE__ */ new Set();
    for (const line of this.lines) {
      const runningNumber = parseInt(line.slice(5, 13));
      if (existingNumbers.has(runningNumber)) {
        throw new Error(
          `BKMVDATA.txt has more than one '${existingNumbers}' running number`
        );
      }
      existingNumbers.add(runningNumber);
    }
    if (existingNumbers.size !== this.lines.length) {
      throw new Error(`BKMVDATA.txt has skipped some running numbers`);
    }
  }
  validateBeforeSave() {
    this.validateHeader();
    this.validateFooter();
    this.validateLength();
    this.validateRunningNumbers();
  }
  countRowsByType() {
    this.validateFooter();
    return {
      C100: this.lines.filter((value) => value.startsWith("C100")).length,
      D110: this.lines.filter((value) => value.startsWith("D110")).length,
      D120: this.lines.filter((value) => value.startsWith("D120")).length,
      B100: this.lines.filter((value) => value.startsWith("B100")).length,
      B110: this.lines.filter((value) => value.startsWith("B110")).length,
      M100: this.lines.filter((value) => value.startsWith("M100")).length
    };
  }
  createBKMVDATAHeader() {
    const getValue = (cell) => {
      var _a, _b;
      return (_b = (_a = this.computedValues(cell)) != null ? _a : getNestedValue(this.input, cell.name)) != null ? _b : cell.default;
    };
    this.createRow(bkmvdataSchema.header, getValue, void 0);
  }
  createC100Row(document) {
    const getValue = (cell) => {
      var _a, _b, _c;
      return (_c = (_b = (_a = this.computedValues(cell)) != null ? _a : getNestedValue(document, cell.name)) != null ? _b : getNestedValue(this.input, cell.name)) != null ? _c : cell.default;
    };
    this.createRow(bkmvdataSchema.C100, getValue, document);
  }
  createD110Row(document, item) {
    const getValue = (cell) => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = this.computedValues(cell)) != null ? _a : getNestedValue(item, cell.name)) != null ? _b : getNestedValue(document, cell.name)) != null ? _c : getNestedValue(this.input, cell.name)) != null ? _d : cell.default;
    };
    this.createRow(bkmvdataSchema.D110, getValue, item);
  }
  createD120Row(document, item) {
    const getValue = (cell) => {
      var _a, _b, _c, _d;
      return (_d = (_c = (_b = (_a = this.computedValues(cell)) != null ? _a : getNestedValue(item, cell.name)) != null ? _b : getNestedValue(document, cell.name)) != null ? _c : getNestedValue(this.input, cell.name)) != null ? _d : cell.default;
    };
    this.createRow(bkmvdataSchema.D120, getValue, item);
  }
  // private createB100Row(document: DocumentRecord, item: DocumentPayment): void {
  //   const getValue = (cell: Cell<DocumentPayment>) => {
  //     return (
  //       this.computedValues(cell) ??
  //       getNestedValue(item, cell.name) ??
  //       getNestedValue(document, cell.name) ??
  //       getNestedValue(this.input, cell.name) ??
  //       cell.default
  //     )
  //   }
  //
  //   this.createRow<DocumentPayment>(bkmvdataSchema.B100, getValue, item)
  // }
  //
  // private createB110Row(document: DocumentRecord, item: DocumentPayment): void {
  //   const getValue = (cell: Cell<DocumentPayment>) => {
  //     return (
  //       this.computedValues(cell) ??
  //       getNestedValue(item, cell.name) ??
  //       getNestedValue(document, cell.name) ??
  //       getNestedValue(this.input, cell.name) ??
  //       cell.default
  //     )
  //   }
  //
  //   this.createRow<DocumentPayment>(bkmvdataSchema.B110, getValue, item)
  // }
  createBKMVDATABody() {
    for (const document of this.input.documents) {
      this.createC100Row(document);
      for (const item of document.items) {
        this.createD110Row(document, item);
      }
      for (const payment of document.payments) {
        this.createD120Row(document, payment);
      }
    }
  }
  createBKMVDATAFooter() {
    const getValue = (cell) => {
      var _a, _b;
      return (_b = (_a = this.computedValues(cell)) != null ? _a : getNestedValue(this.input, cell.name)) != null ? _b : cell.default;
    };
    this.createRow(bkmvdataSchema.footer, getValue, void 0);
  }
  create() {
    this.createBKMVDATAHeader();
    this.createBKMVDATABody();
    this.createBKMVDATAFooter();
  }
};

// src/index.ts
var import_nanoid = require("nanoid");
var path3 = __toESM(require("path"));
var import_zip_a_folder = require("zip-a-folder");
function getDirPath(input) {
  const taxIdWithoutCheckDigit = input.business.taxId.toString().slice(0, 8);
  const shortYear = input.processStartDate.getFullYear().toString().slice(2);
  return `OPENFRMT/${taxIdWithoutCheckDigit}.${shortYear}/${dateToMMDDhhmm(
    input.processStartDate
  )}`;
}
function generateUSF(input) {
  return __async(this, null, function* () {
    const nanoid = (0, import_nanoid.customAlphabet)("123456789", 15);
    const uuid = nanoid();
    const dirPath = getDirPath(input);
    const iniFilePath = path3.join(dirPath, "INI.txt");
    const dataFilePath = path3.join(dirPath, "BKMVDATA.txt");
    const dataGenerator = new DataGenerator(input, uuid, dataFilePath);
    yield dataGenerator.saveToFile();
    const iniGenerator = new IniGenerator(
      input,
      uuid,
      iniFilePath,
      dataGenerator.countRowsByType()
    );
    yield iniGenerator.saveToFile();
    yield (0, import_zip_a_folder.zip)("OPENFRMT", `OPENFRMT.zip`);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateUSF
});
//# sourceMappingURL=index.js.map