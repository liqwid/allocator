import { boostMultiplierClient } from 'clients/boostMultiplierClient'
import { BoostMultiplier } from 'models'

export const boostMultiplierProvider = (): BoostMultiplier =>
  boostMultiplierClient()
