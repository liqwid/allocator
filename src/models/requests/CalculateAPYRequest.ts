import { Coin } from '../types/Coin'
import { Strategy } from '../types/Strategy'

export interface CalculateAPYRequest {
  data: StrategyCoinAllocationRequest[]
}

export interface StrategyCoinAllocationRequest {
  coin: Coin
  strategy: Strategy
  percentage: string
}
