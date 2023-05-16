import { Dictionary } from '../types'

export const expectedINILineLength: Dictionary<number> = {
  A000: 466,
  B100: 19,
  B110: 19,
  C100: 19,
  D110: 19,
  D120: 19,
  M100: 19,
}

export const expectedDATALineLength: Dictionary<number> = {
  A100: 95,
  B100: 317,
  B110: 376,
  C100: 444,
  D110: 339,
  D120: 222,
  M100: 298,
  Z900: 110,
}
export const expectedLineLength = {
  'INI.TXT': expectedINILineLength,
  'BKMVDATA.TXT': expectedDATALineLength,
}
