import BigNumber from 'bignumber.js'
import { BoostMultiplier } from 'models'

export const boostMultiplierProvider = jest.fn((): BoostMultiplier => {
  return { amount: new BigNumber('1.99') }
})
