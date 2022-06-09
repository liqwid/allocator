import BigNumber from 'bignumber.js'
import { groupBy, keyBy, mapValues, pipe } from 'lodash/fp'
import {
  Coin,
  CoinAllocation,
  CoinPercentageDistribution,
  allCoins,
  allStrategies,
} from 'models'
import { TotalValueAllocation } from 'models/TotalValueAllocation'
import { mixedStrategyAllocation } from '__tests__/utils'
import { totalAllocationCalculator } from './totalAllocationCalculator'

describe('total value allocation calculator', () => {
  it('should calculate how all value is distributed between strategies and coins', () => {
    const distribution = [
      { coin: Coin.DAI, percentage: new BigNumber('10') },
      { coin: Coin.DAI, percentage: new BigNumber('40') },
      { coin: Coin.DAI, percentage: new BigNumber('50') },
    ]

    const result = totalAllocationCalculator(
      distribution,
      mixedStrategyAllocation,
    )

    const groupedTotalAllocation = pipe(
      groupBy('strategy'),
      mapValues(keyBy<TotalValueAllocation>('coin')),
    )(result)

    const groupedCoinAllocation = pipe(
      groupBy('strategy'),
      mapValues(keyBy<CoinAllocation>('coin')),
    )(mixedStrategyAllocation)

    const groupedDistribution = keyBy<CoinPercentageDistribution>(
      'coin',
      distribution,
    )

    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        const totaValueAllocated =
          groupedTotalAllocation[strategy][coin].percentage
        const coinAllocated = groupedCoinAllocation[strategy][coin].percentage
        const coinDistribution = groupedDistribution[coin].percentage

        expect(totaValueAllocated).toEqual(
          coinAllocated.multipliedBy(coinDistribution).dividedBy(100),
        )
      })
    })
  })

  it('should calculate how all value is distributed between strategies and coins when one of the coins has 0 value', () => {
    const distribution = [
      { coin: Coin.DAI, percentage: new BigNumber('0') },
      { coin: Coin.DAI, percentage: new BigNumber('50') },
      { coin: Coin.DAI, percentage: new BigNumber('50') },
    ]

    const result = totalAllocationCalculator(
      distribution,
      mixedStrategyAllocation,
    )

    const groupedTotalAllocation = pipe(
      groupBy('strategy'),
      mapValues(keyBy<TotalValueAllocation>('coin')),
    )(result)

    const groupedCoinAllocation = pipe(
      groupBy('strategy'),
      mapValues(keyBy<CoinAllocation>('coin')),
    )(mixedStrategyAllocation)

    const groupedDistribution = keyBy<CoinPercentageDistribution>(
      'coin',
      distribution,
    )

    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        const totaValueAllocated =
          groupedTotalAllocation[strategy][coin].percentage
        const coinAllocated = groupedCoinAllocation[strategy][coin].percentage
        const coinDistribution = groupedDistribution[coin].percentage

        expect(totaValueAllocated).toEqual(
          coinAllocated.multipliedBy(coinDistribution).dividedBy(100),
        )
      })
    })
  })

  it('should calculate how all value is distributed between strategies and coins when all coins have 0 value', () => {
    const distribution = [
      { coin: Coin.DAI, percentage: new BigNumber('0') },
      { coin: Coin.DAI, percentage: new BigNumber('0') },
      { coin: Coin.DAI, percentage: new BigNumber('0') },
    ]

    const result = totalAllocationCalculator(
      distribution,
      mixedStrategyAllocation,
    )

    const groupedTotalAllocation = pipe(
      groupBy('strategy'),
      mapValues(keyBy<TotalValueAllocation>('coin')),
    )(result)

    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        const totaValueAllocated =
          groupedTotalAllocation[strategy][coin].percentage

        expect(totaValueAllocated).toEqual(new BigNumber('0'))
      })
    })
  })
})
