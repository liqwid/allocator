import { Coin, Strategy } from 'models'

export const bestCoinStrategySelector = (coin: Coin): Strategy => {
  throw Error(`selectBestCoinStrategy not implemented ${coin}`)
}
