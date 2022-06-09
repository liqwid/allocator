import BigNumber from 'bignumber.js'
import { Coin, Strategy } from './types'

/** Allocation of single coin between strategies */
export interface CoinAllocation {
  coin: Coin
  strategy: Strategy
  percentage: BigNumber
}
