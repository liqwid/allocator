import BigNumber from 'bignumber.js'
import { BoostMultiplier } from 'models'

export const boostMultiplierProvider = (): BoostMultiplier => {
  return { amount: new BigNumber('1.99') }
}
