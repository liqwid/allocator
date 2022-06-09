import BigNumber from 'bignumber.js'

export const projectedAPYCalculator = jest.fn((): BigNumber => {
  return new BigNumber(2.78)
})
