import { APYKey, StrategyCoinAPY } from 'models'

export const strategyAPYProvider = (request: APYKey): StrategyCoinAPY => {
  throw Error(`Not implemented ${request}`)
}
