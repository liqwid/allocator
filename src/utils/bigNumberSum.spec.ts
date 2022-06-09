import BigNumber from 'bignumber.js'
import { bigNumberSum, sumBigNumberArray } from './bigNumberSum'

describe('big number summing', () => {
  it('it should return sum of 2 big numbers', () => {
    const a = new BigNumber('1234.1234')
    const b = new BigNumber('4321.4321')

    expect(bigNumberSum(a, b)).toEqual(new BigNumber('5555.5555'))
  })
})

describe('big number array sum', () => {
  it('it should return array sum', () => {
    expect(
      sumBigNumberArray([
        new BigNumber('0'),
        new BigNumber('1'),
        new BigNumber('1'),
        new BigNumber('2'),
        new BigNumber('3'),
        new BigNumber('5'),
      ]),
    ).toEqual(new BigNumber('12'))
  })

  it('it should return 0 if array is empty', () => {
    expect(sumBigNumberArray([])).toEqual(new BigNumber('0'))
  })
})
