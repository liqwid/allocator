import BigNumber from 'bignumber.js'
import { APYKey, StrategyCoinAPY } from 'models'

export const strategyAPYCalculator = jest.fn((key: APYKey): StrategyCoinAPY => {
  return {
    key,
    APY: new BigNumber('0.99'),
  }
})
