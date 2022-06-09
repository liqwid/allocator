import { Dictionary } from 'lodash'
import { groupBy, keyBy, mapValues, pipe } from 'lodash/fp'
import {
  allCoins,
  allStrategies,
  Coin,
  Strategy,
  StrategyCoinAllocation,
} from 'models'
import { sumBigNumberArray } from 'utils'

export const requestAllocationValidator = (
  strategyAllocations: StrategyCoinAllocation[],
): void => {
  const groupedAllocations = pipe(
    groupBy('coin'),
    mapValues(keyBy<StrategyCoinAllocation>('strategy')),
  )(strategyAllocations)

  allCoins.forEach(validateCoinAllocation(groupedAllocations))
}

const validateCoinAllocation =
  (groupedAllocations: Dictionary<Dictionary<StrategyCoinAllocation>>) =>
  (coin: Coin) => {
    const coinAllocation = groupedAllocations[coin]

    if (!coinAllocation) throw Error(`Missing allocation for coin ${coin}`)

    const strategyAllocations = allStrategies.map(
      getStrategyAllocationPercentage(coin, coinAllocation),
    )

    const totalAllocation = sumBigNumberArray(strategyAllocations)

    if (totalAllocation.isGreaterThan(100))
      throw Error(`Allocation for coin ${coin} is >100%`)

    if (totalAllocation.isLessThan(100))
      throw Error(`Allocation for coin ${coin} is <100%`)
  }

const getStrategyAllocationPercentage =
  (coin: Coin, coinAllocation: Dictionary<StrategyCoinAllocation>) =>
  (strategy: Strategy) => {
    const strategyAllocation = coinAllocation[strategy]
    if (!strategyAllocation)
      throw Error(`Missing allocation for strategy ${strategy} coin ${coin}`)
    return strategyAllocation.percentage
  }
