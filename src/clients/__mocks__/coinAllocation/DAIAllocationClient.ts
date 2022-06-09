import BigNumber from 'bignumber.js'
import { Coin, CoinDistribution } from 'models'

export const DAIAllocationClient = (): CoinDistribution => {
  return { coin: Coin.DAI, amount: new BigNumber('23512695') }
}
