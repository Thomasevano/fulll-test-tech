import { expect, test } from 'vitest'
import { fizzbuzz } from './fizzbuzz'

test('number can be divided by 3', () => {
  expect(fizzbuzz(3)).toBe('Fizz')
})