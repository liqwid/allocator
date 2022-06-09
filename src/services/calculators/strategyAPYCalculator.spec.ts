import BigNumber from 'bignumber.js'
import { allAPYTypes, allCoins, allStrategies, APYKey } from 'models'
import { boostMultiplierProvider } from 'providers/boostMultiplierProvider'
import { strategyAPYProvider } from 'providers/strategyAPYProvider'
import { strategyAPYCalculator } from './strategyAPYCalculator'

jest.mock('providers/boostMultiplierProvider')
jest.mock('providers/strategyAPYProvider')

describe('strategy APY calculator', () => {
  it('should get boost multiplier from provider', () => {
    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        allAPYTypes.forEach((type) => {
          ;(boostMultiplierProvider as jest.Mock).mockClear()

          strategyAPYCalculator({
            coin,
            strategy,
            type,
          })

          expect(boostMultiplierProvider).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  it('should get boost strategy APY from provider', () => {
    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        allAPYTypes.forEach((type) => {
          ;(strategyAPYProvider as jest.Mock).mockClear()

          strategyAPYCalculator({
            coin,
            strategy,
            type,
          })

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
          const boostMultiplier = new BigNumber(1.9)
          const strategyAPY = new BigNumber(Math.random())
          ;(boostMultiplierProvider as jest.Mock).mockImplementationOnce(() => {
            return { amount: boostMultiplier }
          })
          ;(strategyAPYProvider as jest.Mock).mockImplementationOnce(
            (key: APYKey) => {
              return { key, APY: strategyAPY }
            },
          )

          const { APY } = strategyAPYCalculator({
            coin,
            strategy,
            type,
          })

          expect(APY).toEqual(strategyAPY.multipliedBy(boostMultiplier))
        })
      })
    })
  })
})
