import { DAIAllocationClient } from 'clients/__mocks__/coinAllocation/DAIAllocationClient'
import { USDCAllocationClient } from 'clients/__mocks__/coinAllocation/USDCAllocationClient'
import { USDTAllocationClient } from 'clients/__mocks__/coinAllocation/USDTAllocationClient'
import { allCoins, Coin, CoinDistribution } from 'models'

const coinClients = {
  [Coin.DAI]: DAIAllocationClient,
  [Coin.USDC]: USDCAllocationClient,
  [Coin.USDT]: USDTAllocationClient,
}

export const coinDistributionProvider = (): CoinDistribution[] =>
  allCoins.map((coin) => coinClients[coin]())
