import { allStrategies, Strategy } from 'models'

export const bestCoinStrategySelector = jest.fn(
  (): Strategy => allStrategies[0],
)
