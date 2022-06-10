import { allCoins, allStrategies } from 'models'
import { allocationCsvParser } from './allocationCsvParser'

describe('allocation csv parser', () => {
  it('should throw if wrong coins are specified in csv', () => {
    const csv = `
      coin, Aave, Compound, Convex
      DAI, 30, 20, 50
      USDC, 50, 10, 40
      UST, 80, 2, 18
    `

    expect(() => allocationCsvParser(csv)).toThrowError(
      'UST is not as correct coin. Specify one of DAI, USDT, USDC',
    )
  })

  it('should throw if wrong strategies are specified in csv', () => {
    const csv = `
      coin, Uniswap, Compound, Convex
      DAI, 30, 20, 50
      USDC, 50, 10, 40
      USD, 80, 2, 18
    `

    expect(() => allocationCsvParser(csv)).toThrowError(
      'Uniswap is not as correct strategy. Specify one of Compound, Convex, Aave',
    )
  })

  it('should parse csv into coin allocations', () => {
    const csv = `
      coin, Aave, Compound, Convex
      DAI, 30, 20, 50
      USDC, 50, 10, 40
      USDT, 80, 2, 18
    `

    const results = allocationCsvParser(csv)

    allCoins.forEach((coin) => {
      allStrategies.forEach((strategy) => {
        expect(
          results.find(
            (allocation) =>
              coin === allocation.coin && strategy === allocation.strategy,
          ),
        ).toBeTruthy()
      })
    })
  })
})
