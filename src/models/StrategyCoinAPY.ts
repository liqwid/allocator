import BigNumber from 'bignumber.js'
import { APYKey } from './APYKey'

export interface StrategyCoinAPY {
  key: APYKey
  APY: BigNumber
}
