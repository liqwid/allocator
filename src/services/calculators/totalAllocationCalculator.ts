import { CoinPercentageDistribution, CoinAllocation } from 'models'
import { TotalValueAllocation } from 'models/TotalValueAllocation'

export const totalAllocationCalculator = (
  coinDistribution: CoinPercentageDistribution[],
  strategyAllocations: CoinAllocation[],
): TotalValueAllocation[] => {
  throw Error(
    `weightedAPYsCalculator Not implemented ${coinDistribution} ${strategyAllocations}`,
  )
}
