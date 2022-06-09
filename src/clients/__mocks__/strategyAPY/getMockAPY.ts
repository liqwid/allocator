import BigNumber from 'bignumber.js'
import { APYType, Coin, Strategy, StrategyCoinAPY } from 'models'

export const getMockAPY = (
  strategy: Strategy,
  coin: Coin,
  type: APYType,
  amounts: Map<APYType, Map<Coin, string>>,
): StrategyCoinAPY => {
  const key = { coin, type, strategy }
  const stringAmount = amounts.get(type)?.get(coin)
  if (!stringAmount) throw new Error(`unknown coin ${coin} or type ${type}`)
  const APY = new BigNumber(stringAmount)
  return {
    key,
    APY,
  }
}
