export function fizzbuzz(param: number): string | number {
  if (param % 15 === 0)
    return "FizzBuzz"
  else if (param % 3 === 0)
    return "Fizz"
  else if (param % 5 === 0)
    return "Buzz"
  else return param
}