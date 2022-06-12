import { allStrategies, Strategy } from 'models'

export const selectBestCoinStrategy = jest.fn((): Strategy => allStrategies[0]
