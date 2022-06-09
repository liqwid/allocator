import { APYKey, StrategyCoinAPY } from 'models'

export const strategyAPYProvider = jest.fn(
  (request: APYKey): StrategyCoinAPY => {
    throw Error(`Not implemented ${request}`)
  },
)
