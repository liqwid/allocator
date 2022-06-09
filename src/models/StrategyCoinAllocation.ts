import BigNumber from 'bignumber.js'
import { Coin, Strategy } from './types'

export interface StrategyCoinAllocation {
  coin: Coin
  strategy: Strategy
  percentage: BigNumber
}
