import BigNumber from 'bignumber.js'
import { Dictionary } from 'lodash'
import { groupBy, mapValues, map, pipe } from 'lodash/fp'
import { StrategyCoinAPY } from 'models'
import { TotalValueAllocation } from 'models/TotalValueAllocation'
import { WeightedAPY } from 'models/WieghtedAPY'
import { sumBigNumberArray } from 'utils'

export const weightedAPYsCalculator = (
  totalValueAllocations: TotalValueAllocation[],
  strategyAPYs: StrategyCoinAPY[],
): WeightedAPY[] => {
  const groupedStrategyAPYs: Dictionary<Dictionary<BigNumber>> = pipe(
    map(({ key, APY }) => ({
      key,
      coin: key.coin,
      strategy: key.strategy,
      APY,
    })),
    groupBy('coin'),
    mapValues(pipe(groupBy('strategy'), mapValues(combineDifferentAPYTypes))),
  )(strategyAPYs)

  return totalValueAllocations.map(({ coin, strategy, percentage }) => {
    const weightedAPY = groupedStrategyAPYs[coin][strategy]
      .multipliedBy(percentage)
      .dividedBy('100')

    return {
      coin,
      strategy,
      APY: weightedAPY,
    }
  })
}

const combineDifferentAPYTypes = (
  sameStrategyAllocations: StrategyCoinAPY[],
) => {
  return pipe(
    map(({ APY }) => APY),
    sumBigNumberArray,
  )(sameStrategyAllocations)
}
