import { APYType, Coin, Strategy, StrategyCoinAPY } from 'models'
import { getMockAPY } from 'utils'

const strategy = Strategy.Convex

export const convexAPYClient = (coin: Coin, type: APYType): StrategyCoinAPY => {
  return getMockAPY(strategy, coin, type, amounts)
}

const amounts: Map<APYType, Map<Coin, string>> = new Map([
  [
    APYType.Reward,
    new Map([
      [Coin.DAI, '1.49'],
      [Coin.USDC, '1.49'],
      [Coin.USDT, '1.49'],
    ]),
  ],
  [
    APYType.Base,
    new Map([
      [Coin.DAI, '-0.21'],
      [Coin.USDC, '-0.21'],
      [Coin.USDT, '-0.21'],
    ]),
  ],
])
