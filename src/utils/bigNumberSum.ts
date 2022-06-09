import BigNumber from 'bignumber.js'

export const bigNumberSum = (a: BigNumber, b: BigNumber): BigNumber => a.plus(b)

export const sumBigNumberArray = (array: BigNumber[]): BigNumber =>
  array.reduce(bigNumberSum, new BigNumber(0))
