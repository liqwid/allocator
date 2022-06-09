import BigNumber from 'bignumber.js'
import { Coin, Strategy } from 'models'
import { WeightedAPY } from 'models/WieghtedAPY'

export const weightedAPYsCalculator = jest.fn((): WeightedAPY[] => {
  return [
    { coin: Coin.DAI, strategy: Strategy.Aave, APY: new BigNumber('0.011') },
    { coin: Coin.USDC, strategy: Strategy.Aave, APY: new BigNumber('0.012') },
    { coin: Coin.USDT, strategy: Strategy.Aave, APY: new BigNumber('0.013') },
    {
      coin: Coin.DAI,
      strategy: Strategy.Compound,
      APY: new BigNumber('0.021'),
    },
    {
      coin: Coin.USDC,
      strategy: Strategy.Compound,
      APY: new BigNumber('0.022'),
    },
    {
      coin: Coin.USDT,
      strategy: Strategy.Compound,
      APY: new BigNumber('0.023'),
    },
    { coin: Coin.DAI, strategy: Strategy.Convex, APY: new BigNumber('0.031') },
    { coin: Coin.USDC, strategy: Strategy.Convex, APY: new BigNumber('0.032') },
    { coin: Coin.USDT, strategy: Strategy.Convex, APY: new BigNumber('0.033') },
  ]
})
