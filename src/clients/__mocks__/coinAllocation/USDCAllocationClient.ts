import BigNumber from 'bignumber.js'
import { Coin, CoinDistribution } from 'models'

export const USDCAllocationClient = (): CoinDistribution => {
  return { coin: Coin.USDC, amount: new BigNumber('28746090') }
}
