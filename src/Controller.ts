import { APYType } from 'models'
import { CalculateAPYResult } from 'models/CalculateAPYResult'
import { CoinAllocation } from 'models/CoinAllocation'
import { boostMultiplierProvider } from 'providers/boostMultiplierProvider'
import { percentageDistributionCalculator } from 'services/calculators/percentageDistributionCalculator'
import { projectedAPYCalculator } from 'services/calculators/projectedAPYCalculator'
import { strategyAPYCalculator } from 'services/calculators/strategyAPYCalculator'
import { totalAllocationCalculator } from 'services/calculators/totalAllocationCalculator'
import { weightedAPYsCalculator } from 'services/calculators/weightedAPYsCalculator'
import { requestAllocationValidator } from 'services/validators/requestAllocationValidator'

export const calculateAPY = (
  strategyAllocations: CoinAllocation[],
): CalculateAPYResult => {
  requestAllocationValidator(strategyAllocations)

  const coinDistribution = percentageDistributionCalculator()

  const boostMultiplier = boostMultiplierProvider()

  const strategyAPYs = strategyAllocations.flatMap(({ coin, strategy }) => {
    const allAPYTypes = Object.values(APYType)

    return allAPYTypes.map((type) =>
      strategyAPYCalculator({ coin, strategy, type }, boostMultiplier),
    )
  })

  const totalValueAllocations = totalAllocationCalculator(
    coinDistribution,
    strategyAllocations,
  )

  const weightedAPYs = weightedAPYsCalculator(
    totalValueAllocations,
    strategyAPYs,
  )

  const projectedAPY = projectedAPYCalculator(weightedAPYs)

  return {
    projectedAPY,
    weightedAPYs,
  }
}
