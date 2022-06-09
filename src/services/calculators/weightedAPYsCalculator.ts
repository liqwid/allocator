import {
  CoinDistribution,
  StrategyCoinAllocation,
  StrategyCoinAPY,
} from 'models'
import { WeightedAPY } from 'models/WieghtedAPY'

export const weightedAPYsCalculator = (
  coinDistribution: CoinDistribution[],
  strategyAllocations: StrategyCoinAllocation[],
  strategyAPYs: StrategyCoinAPY[],
): WeightedAPY[] => {
  throw Error(
    `Not implemented ${coinDistribution} ${strategyAllocations} ${strategyAPYs}`,
  )
}
