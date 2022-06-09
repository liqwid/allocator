import BigNumber from 'bignumber.js'

import { calculateAPY } from 'Controller'
import {
  allAPYTypes,
  BoostMultiplier,
  CoinDistribution,
  StrategyCoinAPY,
  WeightedAPY,
} from 'models'
import { requestAllocationValidator } from 'services/validators/requestAllocationValidator'
import { projectedAPYCalculator } from 'services/calculators/projectedAPYCalculator'
import { strategyAPYCalculator } from 'services/calculators/strategyAPYCalculator'
import { weightedAPYsCalculator } from 'services/calculators/weightedAPYsCalculator'

import { mixedStrategyAllocation } from '__tests__/utils'
import { boostMultiplierProvider } from 'providers/boostMultiplierProvider'
import { percentageDistributionCalculator } from 'services/calculators/percentageDistributionCalculator'

jest.mock('services/validators/requestAllocationValidator')
jest.mock('services/calculators/projectedAPYCalculator')
jest.mock('services/calculators/strategyAPYCalculator')
jest.mock('services/calculators/weightedAPYsCalculator')
jest.mock('services/calculators/coinDistributionCalculator')
jest.mock('providers/boostMultiplierProvider')

describe('APY Calculation Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call request allocation validator with strategy coin allocation', () => {
    calculateAPY(mixedStrategyAllocation)
    expect(requestAllocationValidator).toHaveBeenCalledTimes(1)
    expect(requestAllocationValidator).toHaveBeenCalledWith(
      mixedStrategyAllocation,
    )
  })

  it('should throw validation error if request allocation validator fails', () => {
    ;(requestAllocationValidator as jest.Mock).mockImplementationOnce(() => {
      throw Error('validation error')
    })
    expect(() => calculateAPY(mixedStrategyAllocation)).toThrow(
      'validation error',
    )
  })

  it('should call coin distribution calculator', () => {
    calculateAPY(mixedStrategyAllocation)

    expect(percentageDistributionCalculator).toHaveBeenCalledTimes(1)
  })

  it('should call boost multiplier provider', () => {
    calculateAPY(mixedStrategyAllocation)
    expect(boostMultiplierProvider).toHaveBeenCalledTimes(1)
  })

  it('should call strategy APY calculator for each of allocated coin/strategy and for each APY types', () => {
    calculateAPY(mixedStrategyAllocation)

    const boostMultiplier = (
      boostMultiplierProvider as jest.Mock
    ).mock.results.map(({ value }) => value as BoostMultiplier)[0]

    expect(strategyAPYCalculator).toHaveBeenCalledTimes(
      mixedStrategyAllocation.length * allAPYTypes.length,
    )
    mixedStrategyAllocation.forEach(({ coin, strategy }) => {
      allAPYTypes.forEach((type) => {
        expect(strategyAPYCalculator).toHaveBeenCalledWith(
          {
            coin,
            strategy,
            type,
          },
          boostMultiplier,
        )
      })
    })
  })

  it('should call weighted APY calculator with the result of coin distribution provider, strategy APYs calculator call and strategy allocations', () => {
    calculateAPY(mixedStrategyAllocation)

    const coinDistribution = (
      percentageDistributionCalculator as jest.Mock
    ).mock.results.map(({ value }) => value as CoinDistribution[])[0]
    const strategyAPYs = (strategyAPYCalculator as jest.Mock).mock.results.map(
      ({ value }) => value as StrategyCoinAPY,
    )

    expect(weightedAPYsCalculator).toHaveBeenCalledTimes(1)
    expect(weightedAPYsCalculator).toHaveBeenCalledWith(
      coinDistribution,
      mixedStrategyAllocation,
      strategyAPYs,
    )
  })

  it('should call projectedAPY calculator with result of weighted APYs calculator', () => {
    calculateAPY(mixedStrategyAllocation)

    const weightedAPYs = (weightedAPYsCalculator as jest.Mock).mock.results.map(
      ({ value }) => value as WeightedAPY[],
    )[0]

    expect(projectedAPYCalculator).toHaveBeenCalledTimes(1)
    expect(projectedAPYCalculator).toHaveBeenCalledWith(weightedAPYs)
  })

  it('should return the result of projectedAPY calculator', () => {
    const { projectedAPY } = calculateAPY(mixedStrategyAllocation)

    const projectedAPYCallResult = (
      projectedAPYCalculator as jest.Mock
    ).mock.results.map(({ value }) => value as BigNumber)[0]

    expect(projectedAPY).toBe(projectedAPYCallResult)
  })

  it('should return the result of weighted APYs calculator', () => {
    const { weightedAPYs } = calculateAPY(mixedStrategyAllocation)

    const weightedAPYsCallResult = (
      weightedAPYsCalculator as jest.Mock
    ).mock.results.map(({ value }) => value as WeightedAPY[])[0]

    expect(weightedAPYs).toBe(weightedAPYsCallResult)
  })
})
