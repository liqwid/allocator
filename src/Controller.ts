import { APYType } from 'models'
import { CalculateAPYResult } from 'models/CalculateAPYResult'
import { StrategyCoinAllocation } from 'models/StrategyCoinAllocation'
import { coinDistributionProvider } from 'providers/coinDistributionProvider'
import { projectedAPYCalculator } from 'services/calculators/projectedAPYCalculator'
import { strategyAPYCalculator } from 'services/calculators/strategyAPYCalculator'
import { weightedAPYsCalculator } from 'services/calculators/weightedAPYsCalculator'
import { requestAllocationValidator } from 'services/validators/requestAllocationValidator'

export const calculateAPY = (
  strategyAllocations: StrategyCoinAllocation[],
): CalculateAPYResult => {
  requestAllocationValidator(strategyAllocations)

  const coinDistribution = coinDistributionProvider()

  const strategyAPYs = strategyAllocations.flatMap((allocation) => {
    const allAPYTypes = Object.values(APYType)

    return allAPYTypes.map((APYType) =>
      strategyAPYCalculator(allocation, APYType),
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
