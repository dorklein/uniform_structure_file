// Declare a flatten function that takes
// object as parameter and returns the
// flatten object

// Guards
import { Dictionary } from '../types'

export const isObject = (obj: unknown): obj is Dictionary => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}
export const flattenObj = (ob: Dictionary): Dictionary => {
  // The object which contains the
  // final result
  let result: Dictionary = {}

  // loop through the object "ob"
  for (const i in ob) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    const subObj = ob[i]
    if (isObject(subObj)) {
      // if ((typeof subObj) === 'object' && !Array.isArray(subObj)) {
      const temp = flattenObj(subObj)
      for (const j in temp) {
        // Store temp in result
        result[`${i}.${j}`] = temp[j]
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = ob[i]
    }
  }
  return result
}
