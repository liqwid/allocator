import { APYType } from 'models'
import { CalculateAPYResult } from 'models/CalculateAPYResult'
import { StrategyCoinAllocation } from 'models/StrategyCoinAllocation'
import { boostMultiplierProvider } from 'providers/boostMultiplierProvider'
import { coinDistributionCalculator } from 'services/calculators/coinDistributionCalculator'
import { projectedAPYCalculator } from 'services/calculators/projectedAPYCalculator'
import { strategyAPYCalculator } from 'services/calculators/strategyAPYCalculator'
import { weightedAPYsCalculator } from 'services/calculators/weightedAPYsCalculator'
import { requestAllocationValidator } from 'services/validators/requestAllocationValidator'

export const calculateAPY = (
  strategyAllocations: StrategyCoinAllocation[],
): CalculateAPYResult => {
  requestAllocationValidator(strategyAllocations)

  const coinDistribution = coinDistributionCalculator()

  const boostMultiplier = boostMultiplierProvider()

  const strategyAPYs = strategyAllocations.flatMap(({ coin, strategy }) => {
    const allAPYTypes = Object.values(APYType)

    return allAPYTypes.map((type) =>
      strategyAPYCalculator({ coin, strategy, type }, boostMultiplier),
    )
  })

  const weightedAPYs = weightedAPYsCalculator(
    coinDistribution,
    strategyAllocations,
    strategyAPYs,
  )

  const projectedAPY = projectedAPYCalculator(weightedAPYs)

  return {
    projectedAPY,
    weightedAPYs,
  }
}
