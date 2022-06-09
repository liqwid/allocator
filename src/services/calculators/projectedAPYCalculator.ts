import BigNumber from 'bignumber.js'
import { WeightedAPY } from 'models/WieghtedAPY'
import { sumBigNumberArray } from 'utils'

export const projectedAPYCalculator = (
  wieghtedAPYs: WeightedAPY[],
): BigNumber => {
  return sumBigNumberArray(wieghtedAPYs.map(({ APY }) => APY))
}
