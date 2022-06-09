import BigNumber from 'bignumber.js'
import { APYType, StrategyCoinAllocation, StrategyCoinAPY } from 'models'

export const strategyAPYCalculator = jest.fn(
  (allocation: StrategyCoinAllocation, type: APYType): StrategyCoinAPY => {
    return {
      key: {
        strategy: allocation.strategy,
        coin: allocation.coin,
        type,
      },
      APY: new BigNumber('0.99'),
    }
  },
)
