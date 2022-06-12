import { groupBy, keyBy, mapValues, pipe } from 'lodash/fp'
import { allCoins, allStrategies, CoinAllocation } from 'models'

export const printAllocationResult = (allocation: CoinAllocation[]): void => {
  const groupedAllocation = pipe(
    groupBy('coin'),
    mapValues(keyBy('strategy')),
  )(allocation)

  console.log('\nALLOCATION\n')

  console.log(`coin, ${allStrategies.join(', ')}`)

  allCoins.forEach((coin) => {
    const coins = groupedAllocation[coin]
    const allocations = allStrategies.map((strategy) => coins[strategy])
    console.log(`${coin}, ${allocations.join(', ')}`)
  })

  console.log('')
}
