import { CalculateAPYResult } from './CalculateAPYResult'
import { CoinAllocation } from './CoinAllocation'

export interface BestAPYResult {
  APYResult: CalculateAPYResult
  allocation: CoinAllocation[]
}
