import { APYType, StrategyCoinAllocation, StrategyCoinAPY } from 'models'

export const strategyAPYCalculator = (
  allocation: StrategyCoinAllocation,
  type: APYType,
): StrategyCoinAPY => {
  throw Error(`Not implemented ${allocation} ${type}`)
}
