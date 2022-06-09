import BigNumber from 'bignumber.js'

import { calculateAPY } from 'Controller'
import {
  allAPYTypes,
  CoinDistribution,
  StrategyCoinAPY,
  WeightedAPY,
} from 'models'
import { requestAllocationValidator } from 'services/validators/requestAllocationValidator'
import { projectedAPYCalculator } from 'services/calculators/projectedAPYCalculator'
import { strategyAPYCalculator } from 'services/calculators/strategyAPYCalculator'
import { weightedAPYsCalculator } from 'services/calculators/weightedAPYsCalculator'
import { coinDistributionProvider } from 'providers/coinDistributionProvider'

import { mixedStrategyAllocation } from '__tests__/utils'

jest.mock('services/validators/requestAllocationValidator')
jest.mock('services/calculators/projectedAPYCalculator')
jest.mock('services/calculators/strategyAPYCalculator')
jest.mock('services/calculators/weightedAPYsCalculator')
jest.mock('providers/coinDistributionProvider')

describe('APY Calculation Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('it should call request allocation validator with strategy coin allocation', () => {
    calculateAPY(mixedStrategyAllocation)
    expect(requestAllocationValidator).toHaveBeenCalledTimes(1)
    expect(requestAllocationValidator).toHaveBeenCalledWith(
      mixedStrategyAllocation,
    )
  })

  it('it should throw validation error if request allocation validator fails', () => {
    ;(requestAllocationValidator as jest.Mock).mockImplementationOnce(() => {
      throw Error('validation error')
    })
    expect(() => calculateAPY(mixedStrategyAllocation)).toThrow(
      'validation error',
    )
  })

  it('it should call coin distribution provider', () => {
    calculateAPY(mixedStrategyAllocation)

    expect(coinDistributionProvider).toHaveBeenCalledTimes(1)
  })

  it('it should call strategy APY calculator for each of allocated coin/strategy and for each APY types', () => {
    calculateAPY(mixedStrategyAllocation)

    expect(strategyAPYCalculator).toHaveBeenCalledTimes(
      mixedStrategyAllocation.length * allAPYTypes.length,
    )
    mixedStrategyAllocation.forEach(({ coin, strategy }) => {
      allAPYTypes.forEach((type) => {
        expect(strategyAPYCalculator).toHaveBeenCalledWith({
          coin,
          strategy,
          type,
        })
      })
    })
  })

  it('it should call weighted APY calculator with the result of coin distribution provider, strategy APYs calculator call and strategy allocations', () => {
    calculateAPY(mixedStrategyAllocation)

    const coinDistribution = (
      coinDistributionProvider as jest.Mock
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

  it('it should call projectedAPY calculator with result of weighted APYs calculator', () => {
    calculateAPY(mixedStrategyAllocation)

    const weightedAPYs = (weightedAPYsCalculator as jest.Mock).mock.results.map(
      ({ value }) => value as WeightedAPY[],
    )[0]

    expect(projectedAPYCalculator).toHaveBeenCalledTimes(1)
    expect(projectedAPYCalculator).toHaveBeenCalledWith(weightedAPYs)
  })

  it('it should return the result of projectedAPY calculator', () => {
    const { projectedAPY } = calculateAPY(mixedStrategyAllocation)

    const projectedAPYCallResult = (
      projectedAPYCalculator as jest.Mock
    ).mock.results.map(({ value }) => value as BigNumber)[0]

    expect(projectedAPY).toBe(projectedAPYCallResult)
  })

  it('it should return the result of weighted APYs calculator', () => {
    const { weightedAPYs } = calculateAPY(mixedStrategyAllocation)

    const weightedAPYsCallResult = (
      weightedAPYsCalculator as jest.Mock
    ).mock.results.map(({ value }) => value as WeightedAPY[])[0]

    expect(weightedAPYs).toBe(weightedAPYsCallResult)
  })
})
