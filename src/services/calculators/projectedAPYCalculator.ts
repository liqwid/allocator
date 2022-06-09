import BigNumber from 'bignumber.js'
import { WeightedAPY } from 'models/WieghtedAPY'

export const projectedAPYCalculator = (
  wieghtedAPYs: WeightedAPY[],
): BigNumber => {
  throw Error(`projectedAPYCalculator not implemented ${wieghtedAPYs}`)
}
