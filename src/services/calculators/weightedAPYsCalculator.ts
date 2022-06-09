import {
  CoinPercentageDistribution,
  StrategyCoinAllocation,
  StrategyCoinAPY,
} from 'models'
import { WeightedAPY } from 'models/WieghtedAPY'

export const weightedAPYsCalculator = (
  coinDistribution: CoinPercentageDistribution[],
  strategyAllocations: StrategyCoinAllocation[],
  strategyAPYs: StrategyCoinAPY[],
): WeightedAPY[] => {
  throw Error(
    `weightedAPYsCalculator Not implemented ${coinDistribution} ${strategyAllocations} ${strategyAPYs}`,
  )
}
