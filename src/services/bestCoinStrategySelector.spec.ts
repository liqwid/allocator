import { allAPYTypes, allStrategies, Coin, Strategy } from 'models'
import { strategyAPYProvider } from 'providers/strategyAPYProvider'
import { bestCoinStrategySelector } from './bestCoinStrategySelector'

jest.mock('providers/strategyAPYProvider')

describe('best coin strategy selector', () => {
  it('should call APY provider for target coin for each strategy and APY type', () => {
    bestCoinStrategySelector(Coin.DAI)

    expect(strategyAPYProvider).toHaveBeenCalledTimes(
      allStrategies.length * allAPYTypes.length,
    )

    allStrategies.forEach((strategy) => {
      allAPYTypes.forEach((type) => {
        expect(strategyAPYProvider).toHaveBeenCalledWith({
          coin: Coin.DAI,
          strategy,
          type,
        })
      })
    })
  })

  it('should pick strategy which yields largest sum amoung APY types', () => {
    const strategy = bestCoinStrategySelector(Coin.DAI)

    expect(strategy).toBe(Strategy.Compound)
  })
})
