import { Coin, Strategy } from 'models'

export const selectBestCoinStrategy = (coin: Coin): Strategy => {
  throw Error(`selectBestCoinStrategy not implemented ${coin}`)
}
