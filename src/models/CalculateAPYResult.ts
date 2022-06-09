import BigNumber from 'bignumber.js'
import { WeightedAPY } from './WieghtedAPY'

export interface CalculateAPYResult {
  projectedAPY: BigNumber
  weightedAPYs: WeightedAPY[]
}
