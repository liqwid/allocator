import { StrategyCoinAPY } from 'models'
import { TotalValueAllocation } from 'models/TotalValueAllocation'
import { WeightedAPY } from 'models/WieghtedAPY'

export const weightedAPYsCalculator = (
  totalValueAllocations: TotalValueAllocation[],
  strategyAPYs: StrategyCoinAPY[],
): WeightedAPY[] => {
  throw Error(
    `weightedAPYsCalculator Not implemented ${totalValueAllocations} ${strategyAPYs}`,
  )
}
