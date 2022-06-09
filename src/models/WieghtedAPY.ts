import BigNumber from 'bignumber.js'
import { Coin, Strategy } from './types'

export interface WeightedAPY {
  coin: Coin
  strategy: Strategy
  APY: BigNumber
}
