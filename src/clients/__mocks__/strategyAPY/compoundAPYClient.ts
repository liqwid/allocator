import { APYType, Coin, Strategy, StrategyCoinAPY } from 'models'
import { getMockAPY } from './getMockAPY'

const strategy = Strategy.Compound

export const compundAPYClient = (
  coin: Coin,
  type: APYType,
): StrategyCoinAPY => {
  return getMockAPY(strategy, coin, type, amounts)
}

const amounts: Map<APYType, Map<Coin, string>> = new Map([
  [
    APYType.Reward,
    new Map([
      [Coin.DAI, '0.0069'],
      [Coin.USDC, '0.0041'],
      [Coin.USDT, '0.0012'],
    ]),
  ],
  [
    APYType.Base,
    new Map([
      [Coin.DAI, '0.014'],
      [Coin.USDC, '0.0173'],
      [Coin.USDT, '0.0213'],
    ]),
  ],
])
