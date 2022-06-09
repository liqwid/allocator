import BigNumber from 'bignumber.js'
import { Coin, Strategy } from 'models'
import { projectedAPYCalculator } from './projectedAPYCalculator'

const weightedAPYs = [
  {
    coin: Coin.DAI,
    strategy: Strategy.Aave,
    APY: new BigNumber('0.6'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Aave,
    APY: new BigNumber('0.5'),
  },

  {
    coin: Coin.DAI,
    strategy: Strategy.Convex,
    APY: new BigNumber('0.1'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Convex,
    APY: new BigNumber('0.05'),
  },
]

describe('projected APY calculator', () => {
  it('it should sum weighted APYs', () => {
    const propjectedAPY = projectedAPYCalculator(weightedAPYs)

    expect(propjectedAPY).toEqual(new BigNumber('1.25'))
  })
})
