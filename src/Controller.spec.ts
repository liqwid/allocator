import BigNumber from 'bignumber.js'
import { calculateAPY } from 'Controller'
import {
  APYType,
  Coin,
  CoinDistribution,
  StrategyCoinAPY,
  WeightedAPY,
} from 'models'
import { coinDistributionProvider } from 'providers/coinDistributionProvider'
import { projectedAPYCalculator } from 'services/calculators/projectedAPYCalculator'
import { strategyAPYCalculator } from 'services/calculators/strategyAPYCalculator'
import { weightedAPYsCalculator } from 'services/calculators/weightedAPYsCalculator'
import { requestAllocationValidator } from 'services/validators/requestAllocationValidator'
import { mixedStrategyAllocation } from '__tests__/utils'

describe('APY Calculation Controller', () => {
  beforeEach(() => {
    jest.mock('services/validators/requestAllocationValidator')
    jest.mock('services/calculators/projectedAPYCalculator')
    jest.mock('services/calculators/strategyAPYCalculator')
    jest.mock('services/calculators/weightedAPYsCalculator')
    jest.mock('services/providers/coinDistributionProvider')
  })

  it('it should call request allocation validator with strategy coin allocation', () => {
    calculateAPY(mixedStrategyAllocation)
    expect(requestAllocationValidator).toHaveBeenCalledTimes(1)
    expect(requestAllocationValidator).toHaveBeenCalledWith(
      mixedStrategyAllocation,
    )
  })

  it('it should throw validation error if request allocation validator fails', () => {
    jest.mock('services/validators/requestAllocationValidator', () => {
      throw Error('validation error')
    })
    expect(() => calculateAPY(mixedStrategyAllocation)).toThrow(
      'validation error',
    )
  })

  it('it should call coin distribution provider for available coins', () => {
    const allCoins = Object.values(Coin)

    calculateAPY(mixedStrategyAllocation)

    expect(coinDistributionProvider).toHaveBeenCalledTimes(allCoins.length)
  })

  it('it should call strategy APY calculator for each of allocated coin/strategy and for each APY types', () => {
    const allAPYTypes = Object.values(APYType)

    calculateAPY(mixedStrategyAllocation)

    expect(strategyAPYCalculator).toHaveBeenCalledTimes(
      mixedStrategyAllocation.length * allAPYTypes.length,
    )
    mixedStrategyAllocation.forEach((allocation) => {
      allAPYTypes.forEach((type) => {
        expect(strategyAPYCalculator).toHaveBeenCalledWith(allocation, type)
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
    expect(weightedAPYsCalculator).toHaveBeenCalledWith(weightedAPYs)
  })

  it('it should return the result of projectedAPY calculator', () => {
    const result = calculateAPY(mixedStrategyAllocation)

    const projectedAPY = (projectedAPYCalculator as jest.Mock).mock.results.map(
      ({ value }) => value as BigNumber,
    )[0]

    expect(result).toBe(projectedAPY)
  })
})
