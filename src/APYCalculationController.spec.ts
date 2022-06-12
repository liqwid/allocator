import BigNumber from 'bignumber.js'

import { calculateAPY } from 'APYCalculationController'
import {
  allAPYTypes,
  BoostMultiplier,
  CoinPercentageDistribution,
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
import { totalAllocationCalculator } from 'services/calculators/totalAllocationCalculator'
import { TotalValueAllocation } from 'models/TotalValueAllocation'

jest.mock('services/validators/requestAllocationValidator')
jest.mock('services/calculators/projectedAPYCalculator')
jest.mock('services/calculators/strategyAPYCalculator')
jest.mock('services/calculators/totalAllocationCalculator')
jest.mock('services/calculators/weightedAPYsCalculator')
jest.mock('services/calculators/percentageDistributionCalculator')
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

  it('should get coin distribution from calculator', () => {
    calculateAPY(mixedStrategyAllocation)

    expect(percentageDistributionCalculator).toHaveBeenCalledTimes(1)
  })

  it('should get boost multiplier from provider', () => {
    calculateAPY(mixedStrategyAllocation)
    expect(boostMultiplierProvider).toHaveBeenCalledTimes(1)
  })

  it('should calculate strategy APY for each of allocated coin/strategy and for each APY types', () => {
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

  it('should calculate total value allocation with the inter-coin allocation strategy and coin distribution', () => {
    calculateAPY(mixedStrategyAllocation)

    const coinDistribution = (
      percentageDistributionCalculator as jest.Mock
    ).mock.results.map(({ value }) => value as CoinPercentageDistribution[])[0]

    expect(totalAllocationCalculator).toHaveBeenCalledTimes(1)
    expect(totalAllocationCalculator).toHaveBeenCalledWith(
      coinDistribution,
      mixedStrategyAllocation,
    )
  })

  it('should calculate weighted APY with the result of total value allocation and strategy APYs', () => {
    calculateAPY(mixedStrategyAllocation)

    const totalValueAllocations = (
      totalAllocationCalculator as jest.Mock
    ).mock.results.map(({ value }) => value as TotalValueAllocation[])[0]
    const strategyAPYs = (strategyAPYCalculator as jest.Mock).mock.results.map(
      ({ value }) => value as StrategyCoinAPY,
    )

    expect(weightedAPYsCalculator).toHaveBeenCalledTimes(1)
    expect(weightedAPYsCalculator).toHaveBeenCalledWith(
      totalValueAllocations,
      strategyAPYs,
    )
  })

  it('should calculate projectedAPY with result of weighted APYs calculator', () => {
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
