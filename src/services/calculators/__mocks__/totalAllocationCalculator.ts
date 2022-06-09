import BigNumber from 'bignumber.js'
import { Coin, Strategy } from 'models'
import { TotalValueAllocation } from 'models/TotalValueAllocation'

export const totalAllocationCalculator = jest.fn((): TotalValueAllocation[] => {
  return [
    {
      coin: Coin.DAI,
      strategy: Strategy.Aave,
      percentage: new BigNumber('10.39'),
    },
    {
      coin: Coin.USDC,
      strategy: Strategy.Aave,
      percentage: new BigNumber('21.18'),
    },
    {
      coin: Coin.USDT,
      strategy: Strategy.Aave,
      percentage: new BigNumber('18.39'),
    },
    {
      coin: Coin.DAI,
      strategy: Strategy.Compound,
      percentage: new BigNumber('6.93'),
    },
    {
      coin: Coin.USDC,
      strategy: Strategy.Compound,
      percentage: new BigNumber('4.24'),
    },
    {
      coin: Coin.USDT,
      strategy: Strategy.Compound,
      percentage: new BigNumber('0.46'),
    },
    {
      coin: Coin.DAI,
      strategy: Strategy.Convex,
      percentage: new BigNumber('12.8'),
    },
    {
      coin: Coin.USDC,
      strategy: Strategy.Convex,
      percentage: new BigNumber('12.8'),
    },
    {
      coin: Coin.USDT,
      strategy: Strategy.Convex,
      percentage: new BigNumber('12.8'),
    },
  ]
})
