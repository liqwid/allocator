import BigNumber from 'bignumber.js'
import { Coin } from './types/Coin'

export interface CoinDistribution {
  coin: Coin
  amount: BigNumber
}
