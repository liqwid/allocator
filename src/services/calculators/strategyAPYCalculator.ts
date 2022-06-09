import { APYKey, BoostMultiplier, StrategyCoinAPY } from 'models'
import { strategyAPYProvider } from 'providers/strategyAPYProvider'

export const strategyAPYCalculator = (
  key: APYKey,
  boostMultiplier: BoostMultiplier,
): StrategyCoinAPY => {
  const strategyAPY = strategyAPYProvider(key)

  const boostedAPY = strategyAPY.APY.multipliedBy(boostMultiplier.amount)

  return {
    key,
    APY: boostedAPY,
  }
}
