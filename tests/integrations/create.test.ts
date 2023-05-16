import { describe, test } from '@jest/globals'
import { main } from '../../src'

describe('create', () => {
  test('Should work', async () => {
    await main()
  })
})
