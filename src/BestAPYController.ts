import BigNumber from 'bignumber.js'
import { allCoins, allStrategies } from 'models'
import { BestAPYResult } from 'models/BestAPYResult'
import { bestCoinStrategySelector } from 'services/bestCoinStrategySelector'

export const getBestAPY = (): BestAPYResult => {
  const allocation = allCoins.flatMap((coin) => {
    const bestStrategy = bestCoinStrategySelector(coin)
    return allStrategies.map((strategy) => ({
      coin,
      strategy,
      percentage:
        bestStrategy === strategy ? new BigNumber('100') : new BigNumber('0'),
    }))
  })

  return { allocation }
}
