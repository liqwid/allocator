import { getBestAPY } from 'BestAPYController'
import { allCoins, Coin, Strategy } from 'models'
import { selectBestCoinStrategy } from 'services/selectBestCoinStrategy'
import { groupBy, keyBy, mapValues, pipe } from 'lodash/fp'
import BigNumber from 'bignumber.js'
import { removeItemAtIndex } from '__tests__/utils'

jest.mock('services/selectBestCoinStrategy')

describe('Best APY Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call select best strategy for each coin', () => {
    getBestAPY()

    expect(selectBestCoinStrategy).toHaveBeenCalledTimes(allCoins.length)
    allCoins.forEach((coin) => {
      expect(selectBestCoinStrategy).toHaveBeenCalledWith(coin)
    })
  })

  it('should return 100% allocation for each respective coin-strategy', () => {
    const { allocation } = getBestAPY()

    const groupedAllocation = pipe(
      groupBy('coin'),
      mapValues(keyBy('strategy')),
    )(allocation)

    const coins = (
      selectBestCoinStrategy as jest.Mock<Strategy, [Coin]>
    ).mock.calls.map(([coin]) => coin)

    const strategies = (
      selectBestCoinStrategy as jest.Mock<Strategy, [Coin]>
    ).mock.results.map(({ value }) => value)

    coins.forEach((coin, index) => {
      const selectedStrategy = strategies[index]

      expect(groupedAllocation[coin][selectedStrategy]).toEqual(
        new BigNumber('100'),
      )
      removeItemAtIndex(index, strategies).forEach((otherStrategy) => {
        expect(groupedAllocation[coin][otherStrategy]).toEqual(
          new BigNumber('0'),
        )
      })
    })
  })
})
