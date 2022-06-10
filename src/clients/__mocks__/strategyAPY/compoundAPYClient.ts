import { APYType, Coin, Strategy, StrategyCoinAPY } from 'models'
import { getMockAPY } from 'utils/getMockAPY'

const strategy = Strategy.Compound

export const compoundAPYClient = (
  coin: Coin,
  type: APYType,
): StrategyCoinAPY => {
  return getMockAPY(strategy, coin, type, amounts)
}

const amounts: Map<APYType, Map<Coin, string>> = new Map([
  [
    APYType.Reward,
    new Map([
      [Coin.DAI, '0.69'],
      [Coin.USDC, '0.41'],
      [Coin.USDT, '0.12'],
    ]),
  ],
  [
    APYType.Base,
    new Map([
      [Coin.DAI, '1.14'],
      [Coin.USDC, '0.73'],
      [Coin.USDT, '2.13'],
    ]),
  ],
])
