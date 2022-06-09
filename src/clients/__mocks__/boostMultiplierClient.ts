import BigNumber from 'bignumber.js'
import { BoostMultiplier } from 'models'

export const boostMultiplierClient = (): BoostMultiplier => {
  return { amount: new BigNumber('1.99') }
}
