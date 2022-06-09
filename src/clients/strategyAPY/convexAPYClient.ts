import { APYType, Coin, StrategyCoinAPY } from 'models'

export const convexAPYClient = (coin: Coin, type: APYType): StrategyCoinAPY => {
  throw Error(`Not implemented ${coin} ${type}`)
}
