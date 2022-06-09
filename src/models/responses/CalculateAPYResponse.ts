import { Coin, Strategy } from 'models/types'

export interface CalculateAPYResponse {
  projectedAPY: string
  weightedAPYs: WeightedAPYResponse[]
}

export interface WeightedAPYResponse {
  coin: Coin
  strategy: Strategy
  APY: string
}
