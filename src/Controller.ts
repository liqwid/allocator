import { CalculateAPYResult } from 'models/CalculateAPYResult'
import { StrategyCoinAllocation } from 'models/StrategyCoinAllocation'

export const calculateAPY = (
  request: StrategyCoinAllocation[],
): CalculateAPYResult => {
  throw Error(`Not implemented ${request}`)
}
