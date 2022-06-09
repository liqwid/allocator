import { APYType, Coin, Strategy, StrategyCoinAPY } from 'models'
import { getMockAPY } from 'utils/getMockAPY'

const strategy = Strategy.Convex

export const convexAPYClient = (coin: Coin, type: APYType): StrategyCoinAPY => {
  return getMockAPY(strategy, coin, type, amounts)
}

const amounts: Map<APYType, Map<Coin, string>> = new Map([
  [
    APYType.Reward,
    new Map([
      [Coin.DAI, '0.0149'],
      [Coin.USDC, '0.0149'],
      [Coin.USDT, '0.0149'],
    ]),
  ],
  [
    APYType.Base,
    new Map([
      [Coin.DAI, '-0.0021'],
      [Coin.USDC, '-0.0021'],
      [Coin.USDT, '-0.0021'],
    ]),
  ],
])
