import { expect, test } from 'vitest'
import { fizzbuzz } from './fizzbuzz'

test('when paramNumber can be divided by 3 return Fizz', () => {
  const paramNumber = 3
  expect(fizzbuzz(paramNumber)).toBe('Fizz')
})
test('when paramNumber can be divided by 5 return Buzz', () => {
  const paramNumber = 5
  expect(fizzbuzz(paramNumber)).toBe('Buzz')
})
test('when paramNumber can be divided by 5 and 3 return FizzBuzz', () => {
  const paramNumber = 15
  expect(fizzbuzz(paramNumber)).toBe('FizzBuzz')
})
test('when paramNumber can\'t be divided by 5 and 3 return it', () => {
  const paramNumber = 23
  expect(fizzbuzz(paramNumber)).toBe(paramNumber)
})