import { APYType, Coin, Strategy, StrategyCoinAPY } from 'models'
import { getMockAPY } from 'utils/getMockAPY'

const strategy = Strategy.Aave

export const aaveAPYClient = (coin: Coin, type: APYType): StrategyCoinAPY => {
  return getMockAPY(strategy, coin, type, amounts)
}

const amounts: Map<APYType, Map<Coin, string>> = new Map([
  [
    APYType.Reward,
    new Map([
      [Coin.DAI, '0'],
      [Coin.USDC, '0'],
      [Coin.USDT, '0'],
    ]),
  ],
  [
    APYType.Base,
    new Map([
      [Coin.DAI, '0.0164'],
      [Coin.USDC, '0.0104'],
      [Coin.USDT, '0.018'],
    ]),
  ],
])
