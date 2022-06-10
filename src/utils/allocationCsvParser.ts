import BigNumber from 'bignumber.js'
import { allCoins, allStrategies, Coin, CoinAllocation, Strategy } from 'models'

const parseCoin = (coin: string) => {
  if (!allCoins.includes(coin as Coin)) {
    throw Error(
      `${coin} is not as correct coin. Specify one of ${allCoins.join(', ')}`,
    )
  }
  return coin as Coin
}

const parseStrategy = (strategy: string) => {
  if (!allStrategies.includes(strategy as Strategy)) {
    throw Error(
      `${strategy} is not as correct strategy. Specify one of ${allStrategies.join(
        ', ',
      )}`,
    )
  }
  return strategy as Strategy
}

export const allocationCsvParser = (csv: string): CoinAllocation[] => {
  const csvArray = csv
    .trim()
    .split('\n')
    .map((row) => row.split(','))

  const strategies = csvArray[0].slice(1)

  return csvArray.slice(1).flatMap((row) => {
    const coin = parseCoin(row[0].trim())
    return row.slice(1).map((allocation, index) => {
      const strategy = parseStrategy(strategies[index].trim())
      return {
        coin,
        strategy,
        percentage: new BigNumber(allocation.trim()),
      }
    })
  })
}
