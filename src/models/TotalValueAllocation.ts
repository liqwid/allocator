import BigNumber from 'bignumber.js'
import { Coin, Strategy } from './types'

/** Allocation of total value between all coin-strategy pairs */
export interface TotalValueAllocation {
  coin: Coin
  strategy: Strategy
  percentage: BigNumber
}
