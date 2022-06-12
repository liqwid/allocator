import BigNumber from 'bignumber.js'
import { allAPYTypes, allStrategies, Coin, Strategy } from 'models'
import { strategyAPYProvider } from 'providers/strategyAPYProvider'
import { sumBigNumberArray } from 'utils'

export const bestCoinStrategySelector = (coin: Coin): Strategy => {
  const strategyAPYs = allStrategies.map((strategy) => {
    const APY = sumBigNumberArray(
      allAPYTypes.map(
        (type) => strategyAPYProvider({ coin, strategy, type }).APY,
      ),
    )

    return { strategy, APY }
  })

  return strategyAPYs.reduce<{ strategy: Strategy; APY: BigNumber } | null>(
    (acc, { strategy, APY }) => {
      if (acc == null) return { strategy, APY }

      if (acc != null && APY.isGreaterThan(acc.APY)) return { strategy, APY }
      return acc
    },
    null,
  )!.strategy
}
