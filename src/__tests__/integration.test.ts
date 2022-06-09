import BigNumber from 'bignumber.js'
import { keyBy, groupBy, pipe, mapValues } from 'lodash/fp'

import { calculateAPY } from 'Controller'
import { Coin, WeightedAPY } from 'models'
import {
  aaveStrategyAllocation,
  convexStrategyAllocation,
  compoundStrategyAllocation,
  mixedStrategyAllocation,
  removeItemAtIndex,
} from './utils'

describe('APY Calculation service', () => {
  it('it should calculate APY for an Aave-only allocation', () => {
    const { projectedAPY, weightedAPYs } = calculateAPY(aaveStrategyAllocation)
    expect(new BigNumber('2.83')).toBe(projectedAPY.decimalPlaces(2))

    const { Aave, Compound, Convex } = pipe(
      groupBy('strategy'),
      mapValues(keyBy<WeightedAPY>('coin')),
    )(weightedAPYs)

    expect(new BigNumber('1.13')).toBe(Aave[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0.88')).toBe(Aave[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0.82')).toBe(Aave[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('0')).toBe(Compound[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Compound[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Compound[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('0')).toBe(Convex[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Convex[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Convex[Coin.USDT].APY.decimalPlaces(2))
  })

  it('it should calculate APY for a Compound-only allocation', () => {
    const { projectedAPY, weightedAPYs } = calculateAPY(
      compoundStrategyAllocation,
    )
    expect(new BigNumber('3.25')).toBe(projectedAPY.decimalPlaces(2))

    const { Aave, Compound, Convex } = pipe(
      groupBy('strategy'),
      mapValues(keyBy<WeightedAPY>('coin')),
    )(weightedAPYs)

    expect(new BigNumber('0')).toBe(Aave[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Aave[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Aave[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('1.26')).toBe(Compound[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0.96')).toBe(Compound[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('1.03')).toBe(Compound[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('0')).toBe(Convex[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Convex[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Convex[Coin.USDT].APY.decimalPlaces(2))
  })

  it('it should calculate APY for a Convex-only allocation', () => {
    const { projectedAPY, weightedAPYs } = calculateAPY(
      convexStrategyAllocation,
    )
    expect(new BigNumber('3.25')).toBe(projectedAPY.decimalPlaces(2))

    const { Aave, Compound, Convex } = pipe(
      groupBy('strategy'),
      mapValues(keyBy<WeightedAPY>('coin')),
    )(weightedAPYs)

    expect(new BigNumber('0')).toBe(Aave[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Aave[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Aave[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('0')).toBe(Compound[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Compound[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0')).toBe(Compound[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('0.85')).toBe(Convex[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0.85')).toBe(Convex[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0.85')).toBe(Convex[Coin.USDT].APY.decimalPlaces(2))
  })

  it('it should calculate APY for a mixed allocation', () => {
    const { projectedAPY, weightedAPYs } = calculateAPY(mixedStrategyAllocation)
    expect(new BigNumber('2.78')).toBe(projectedAPY.decimalPlaces(2))

    const { Aave, Compound, Convex } = pipe(
      groupBy('strategy'),
      mapValues(keyBy<WeightedAPY>('coin')),
    )(weightedAPYs)

    expect(new BigNumber('0.34')).toBe(Aave[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0.44')).toBe(Aave[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0.66')).toBe(Aave[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('0.25')).toBe(Compound[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0.1')).toBe(Compound[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0.02')).toBe(Compound[Coin.USDT].APY.decimalPlaces(2))

    expect(new BigNumber('0.33')).toBe(Convex[Coin.DAI].APY.decimalPlaces(2))
    expect(new BigNumber('0.33')).toBe(Convex[Coin.USDC].APY.decimalPlaces(2))
    expect(new BigNumber('0.33')).toBe(Convex[Coin.USDT].APY.decimalPlaces(2))
  })

  it('it should throw an error if any coin/allocation strategy is missing are allocated', () => {
    Array(9)
      .fill(undefined)
      .forEach((_, index) => {
        const strategyWithMissingItem = removeItemAtIndex(
          index,
          mixedStrategyAllocation,
        )
        const { strategy, coin } = mixedStrategyAllocation[index]

        expect(() => calculateAPY(strategyWithMissingItem)).toThrow(
          `Missing allocation for strategy ${strategy} coin ${coin}`,
        )
      })
  })

  it('it should throw an error if any of the coins allocation is > 100%', () => {
    Object.values(Coin).forEach((overflowCoin) => {
      const overflowAllocation = mixedStrategyAllocation.map((allocation) =>
        allocation.coin === overflowCoin
          ? {
              ...allocation,
              percentage: allocation.percentage.plus('1'),
            }
          : allocation,
      )

      expect(() => calculateAPY(overflowAllocation)).toThrow(
        `Allocation for coin ${overflowCoin} is >100%`,
      )
    })
  })

  it('it should throw an error if any of the coins allocation is < 100%', () => {
    Object.values(Coin).forEach((overflowCoin) => {
      const overflowAllocation = mixedStrategyAllocation.map((allocation) =>
        allocation.coin === overflowCoin
          ? {
              ...allocation,
              percentage: allocation.percentage.minus('1'),
            }
          : allocation,
      )

      expect(() => calculateAPY(overflowAllocation)).toThrow(
        `Allocation for coin ${overflowCoin} is <100%`,
      )
    })
  })
})
