import BigNumber from 'bignumber.js'
import { keyBy } from 'lodash/fp'
import { CoinPercentageDistribution, CoinAllocation } from 'models'
import { TotalValueAllocation } from 'models/TotalValueAllocation'

export const totalAllocationCalculator = (
  coinDistribution: CoinPercentageDistribution[],
  strategyAllocations: CoinAllocation[],
): TotalValueAllocation[] => {
  if (coinDistribution.every(({ percentage }) => percentage.eq('0'))) {
    return strategyAllocations.map((allocation) => ({
      ...allocation,
      percentage: new BigNumber('0'),
    }))
  }

  const groupedDistribution = keyBy('coin', coinDistribution)

  return strategyAllocations.map((allocation) => ({
    ...allocation,
    percentage: allocation.percentage
      .multipliedBy(groupedDistribution[allocation.coin].percentage)
      .dividedBy('100'),
  }))
}
