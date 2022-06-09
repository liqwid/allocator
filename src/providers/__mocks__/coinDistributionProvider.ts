import BigNumber from 'bignumber.js'
import { Coin, CoinDistribution } from 'models'

export const coinDistributionProvider = jest.fn((): CoinDistribution[] => {
  return [
    {
      coin: Coin.DAI,
      amount: new BigNumber('30'),
    },
    {
      coin: Coin.USDC,
      amount: new BigNumber('50'),
    },
    {
      coin: Coin.USDT,
      amount: new BigNumber('20'),
    },
  ]
})
