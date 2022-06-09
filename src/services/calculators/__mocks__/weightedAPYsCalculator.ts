import BigNumber from 'bignumber.js'
import { Coin, Strategy } from 'models'
import { WeightedAPY } from 'models/WieghtedAPY'

export const weightedAPYsCalculator = jest.fn((): WeightedAPY[] => {
  return [
    { coin: Coin.DAI, strategy: Strategy.Aave, APY: new BigNumber('1.1') },
    { coin: Coin.USDC, strategy: Strategy.Aave, APY: new BigNumber('1.2') },
    { coin: Coin.USDT, strategy: Strategy.Aave, APY: new BigNumber('1.3') },
    {
      coin: Coin.DAI,
      strategy: Strategy.Compound,
      APY: new BigNumber('2.1'),
    },
    {
      coin: Coin.USDC,
      strategy: Strategy.Compound,
      APY: new BigNumber('2.2'),
    },
    {
      coin: Coin.USDT,
      strategy: Strategy.Compound,
      APY: new BigNumber('2.3'),
    },
    { coin: Coin.DAI, strategy: Strategy.Convex, APY: new BigNumber('3.1') },
    { coin: Coin.USDC, strategy: Strategy.Convex, APY: new BigNumber('3.2') },
    { coin: Coin.USDT, strategy: Strategy.Convex, APY: new BigNumber('3.3') },
  ]
})
