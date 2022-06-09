import BigNumber from 'bignumber.js'
import { allAPYTypes, allCoins, allStrategies, APYKey } from 'models'
import { boostMultiplierProvider } from 'providers/boostMultiplierProvider'
import { strategyAPYProvider } from 'providers/strategyAPYProvider'
import { strategyAPYCalculator } from './strategyAPYCalculator'

jest.mock('providers/boostMultiplierProvider')
jest.mock('providers/strategyAPYProvider')

const boostMultiplier = boostMultiplierProvider()

describe('strategy APY calculator', () => {
  it('should get boost strategy APY from provider', () => {
    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        allAPYTypes.forEach((type) => {
          ;(strategyAPYProvider as jest.Mock).mockClear()

          strategyAPYCalculator(
            {
              coin,
              strategy,
              type,
            },
            boostMultiplier,
          )

          expect(strategyAPYProvider).toHaveBeenCalledTimes(1)
          expect(strategyAPYProvider).toHaveBeenCalledWith({
            coin,
            strategy,
            type,
          })
        })
      })
    })
  })

  it('should return strategy APY multiplied by boost multiplier', () => {
    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        allAPYTypes.forEach((type) => {
          const strategyAPY = new BigNumber(Math.random())
          ;(strategyAPYProvider as jest.Mock).mockImplementationOnce(
            (key: APYKey) => {
              return { key, APY: strategyAPY }
            },
          )

          const { APY } = strategyAPYCalculator(
            {
              coin,
              strategy,
              type,
            },
            boostMultiplier,
          )

          expect(APY).toEqual(strategyAPY.multipliedBy(boostMultiplier.amount))
        })
      })
    })
  })
})
