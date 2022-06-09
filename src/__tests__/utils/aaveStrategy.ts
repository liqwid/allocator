import BigNumber from 'bignumber.js'
import { Coin, Strategy } from 'models'

export const aaveStrategyAllocation = [
  {
    coin: Coin.DAI,
    strategy: Strategy.Aave,
    percentage: new BigNumber('100'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Aave,
    percentage: new BigNumber('100'),
  },
  {
    coin: Coin.USDT,
    strategy: Strategy.Aave,
    percentage: new BigNumber('100'),
  },
  {
    coin: Coin.DAI,
    strategy: Strategy.Compound,
    percentage: new BigNumber('0'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Compound,
    percentage: new BigNumber('0'),
  },
  {
    coin: Coin.USDT,
    strategy: Strategy.Compound,
    percentage: new BigNumber('0'),
  },
  { coin: Coin.DAI, strategy: Strategy.Convex, percentage: new BigNumber('0') },
  {
    coin: Coin.USDC,
    strategy: Strategy.Convex,
    percentage: new BigNumber('0'),
  },
  {
    coin: Coin.USDT,
    strategy: Strategy.Convex,
    percentage: new BigNumber('0'),
  },
]
