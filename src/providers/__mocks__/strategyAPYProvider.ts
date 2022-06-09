import { aaveAPYClient } from 'clients/strategyAPY/aaveAPYClient'
import { compoundAPYClient } from 'clients/strategyAPY/compoundAPYClient'
import { convexAPYClient } from 'clients/strategyAPY/convexAPYClient'
import { APYKey, Strategy, StrategyCoinAPY } from 'models'

const APYClients = {
  [Strategy.Aave]: aaveAPYClient,
  [Strategy.Compound]: compoundAPYClient,
  [Strategy.Convex]: convexAPYClient,
}

export const strategyAPYProvider = ({
  strategy,
  coin,
  type,
}: APYKey): StrategyCoinAPY => {
  const client = APYClients[strategy]
  return client(coin, type)
}
