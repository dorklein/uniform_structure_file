import { describe, test } from '@jest/globals'
import { generateUSF } from '../../src'
import { UniformStructureInput } from '../../src/types'
import { createFakeInput } from './fakes/inputs'

describe('create', () => {
  test('Should work', async () => {
    const input: UniformStructureInput = createFakeInput()
    await generateUSF(input)
  })
})
