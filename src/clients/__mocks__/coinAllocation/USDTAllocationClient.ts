import BigNumber from 'bignumber.js'
import { Coin, CoinDistribution } from 'models'

export const USDTAllocationClient = (): CoinDistribution => {
  return { coin: Coin.USDT, amount: new BigNumber('15601766') }
}
