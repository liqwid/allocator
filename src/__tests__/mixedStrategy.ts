import BigNumber from 'bignumber.js'
import { Coin, Strategy } from 'models'

export const mixedStrategyAllocation = [
  {
    coin: Coin.DAI,
    strategy: Strategy.Aave,
    percentage: new BigNumber('30'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Aave,
    percentage: new BigNumber('50'),
  },
  {
    coin: Coin.USDT,
    strategy: Strategy.Aave,
    percentage: new BigNumber('80'),
  },
  {
    coin: Coin.DAI,
    strategy: Strategy.Compound,
    percentage: new BigNumber('20'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Compound,
    percentage: new BigNumber('10'),
  },
  {
    coin: Coin.USDT,
    strategy: Strategy.Compound,
    percentage: new BigNumber('2'),
  },
  {
    coin: Coin.DAI,
    strategy: Strategy.Convex,
    percentage: new BigNumber('50'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Convex,
    percentage: new BigNumber('40'),
  },
  {
    coin: Coin.USDT,
    strategy: Strategy.Convex,
    percentage: new BigNumber('18'),
  },
]
