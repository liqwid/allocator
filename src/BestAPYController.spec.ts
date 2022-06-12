import { getBestAPY } from 'BestAPYController'
import { allCoins, allStrategies, Coin, CoinAllocation, Strategy } from 'models'
import { bestCoinStrategySelector } from 'services/bestCoinStrategySelector'
import { groupBy, keyBy, mapValues, pipe } from 'lodash/fp'
import BigNumber from 'bignumber.js'

jest.mock('services/bestCoinStrategySelector')

describe('Best APY Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call select best strategy for each coin', () => {
    getBestAPY()

    expect(bestCoinStrategySelector).toHaveBeenCalledTimes(allCoins.length)
    allCoins.forEach((coin) => {
      expect(bestCoinStrategySelector).toHaveBeenCalledWith(coin)
    })
  })

  it('should return 100% allocation for each respective coin-strategy', () => {
    const { allocation } = getBestAPY()

    const groupedAllocation = pipe(
      groupBy('coin'),
      mapValues(keyBy<CoinAllocation>('strategy')),
    )(allocation)

    const coins = (
      bestCoinStrategySelector as jest.Mock<Strategy, [Coin]>
    ).mock.calls.map(([coin]) => coin)

    const strategies = (
      bestCoinStrategySelector as jest.Mock<Strategy, [Coin]>
    ).mock.results.map(({ value }) => value)

    coins.forEach((coin, index) => {
      const selectedStrategy = strategies[index]

      expect(groupedAllocation[coin][selectedStrategy].percentage).toEqual(
        new BigNumber('100'),
      )

      allStrategies
        .filter((strategy) => strategy != selectedStrategy)
        .forEach((otherStrategy) => {
          expect(groupedAllocation[coin][otherStrategy].percentage).toEqual(
            new BigNumber('0'),
          )
        })
    })
  })
})
