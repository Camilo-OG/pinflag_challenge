import numberToString from '../utils/numberToString'

test.skip('should return a numeric secuence', () => {
  const result = numberToString(5)

  expect(result).toBe('1,2,3,4,5')
})
