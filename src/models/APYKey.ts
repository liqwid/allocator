import { APYType } from './types/APYType'
import { Coin } from './types/Coin'
import { Strategy } from './types/Strategy'

export interface APYKey {
  strategy: Strategy
  coin: Coin
  type: APYType
}
