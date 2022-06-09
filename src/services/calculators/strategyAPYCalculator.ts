import { APYKey, StrategyCoinAPY } from 'models'
import { boostMultiplierProvider } from 'providers/boostMultiplierProvider'
import { strategyAPYProvider } from 'providers/strategyAPYProvider'

export const strategyAPYCalculator = (key: APYKey): StrategyCoinAPY => {
  const boostMultiplier = boostMultiplierProvider()

  const strategyAPY = strategyAPYProvider(key)

  const boostedAPY = strategyAPY.APY.multipliedBy(boostMultiplier.amount)

  return {
    key,
    APY: boostedAPY,
  }
}
