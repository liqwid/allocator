import { Coin } from 'models'
import { mixedStrategyAllocation, removeItemAtIndex } from '__tests__/utils'
import { requestAllocationValidator } from './requestAllocationValidator'

describe('request allocation validator', () => {
  it('it should not throw errors if all coins strategies are provided and each coin sums to total 100% allocation', () => {
    expect(() => requestAllocationValidator(mixedStrategyAllocation)).toReturn()
  })

  it('it should throw error if any coin/strategy allocation pair is missed', () => {
    Array(9)
      .fill(undefined)
      .forEach((_, index) => {
        const strategyWithMissingItem = removeItemAtIndex(
          index,
          mixedStrategyAllocation,
        )
        const { strategy, coin } = mixedStrategyAllocation[index]

        expect(() =>
          requestAllocationValidator(strategyWithMissingItem),
        ).toThrow(`Missing allocation for strategy ${strategy} coin ${coin}`)
      })
  })

  it('it should throw error if total allocation of any coin is <100%', () => {
    Object.values(Coin).forEach((overflowCoin) => {
      const overflowAllocation = mixedStrategyAllocation.map((allocation) =>
        allocation.coin === overflowCoin
          ? {
              ...allocation,
              percentage: allocation.percentage.plus('1'),
            }
          : allocation,
      )

      expect(() => requestAllocationValidator(overflowAllocation)).toThrow(
        `Allocation for coin ${overflowCoin} is >100%`,
      )
    })
  })

  it('it should throw error if total allocation of any coin is >100% ', () => {
    Object.values(Coin).forEach((overflowCoin) => {
      const overflowAllocation = mixedStrategyAllocation.map((allocation) =>
        allocation.coin === overflowCoin
          ? {
              ...allocation,
              percentage: allocation.percentage.minus('1'),
            }
          : allocation,
      )

      expect(() => requestAllocationValidator(overflowAllocation)).toThrow(
        `Allocation for coin ${overflowCoin} is <100%`,
      )
    })
  })
})
