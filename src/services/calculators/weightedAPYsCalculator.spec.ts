import BigNumber from 'bignumber.js'
import { APYType, Coin, Strategy } from 'models'
import { weightedAPYsCalculator } from './weightedAPYsCalculator'

const strategyAPYs = [
  {
    key: { coin: Coin.DAI, strategy: Strategy.Aave, type: APYType.Base },
    APY: new BigNumber('1.5'),
  },
  {
    key: { coin: Coin.DAI, strategy: Strategy.Aave, type: APYType.Reward },
    APY: new BigNumber('0.5'),
  },
  {
    key: { coin: Coin.USDC, strategy: Strategy.Aave, type: APYType.Base },
    APY: new BigNumber('1'),
  },
  {
    key: { coin: Coin.USDC, strategy: Strategy.Aave, type: APYType.Reward },
    APY: new BigNumber('0'),
  },

  {
    key: { coin: Coin.DAI, strategy: Strategy.Convex, type: APYType.Base },
    APY: new BigNumber('0.5'),
  },
  {
    key: {
      coin: Coin.DAI,
      strategy: Strategy.Convex,
      type: APYType.Reward,
    },
    APY: new BigNumber('0.5'),
  },
  {
    key: { coin: Coin.USDC, strategy: Strategy.Convex, type: APYType.Base },
    APY: new BigNumber('-1'),
  },
  {
    key: {
      coin: Coin.USDC,
      strategy: Strategy.Convex,
      type: APYType.Reward,
    },
    APY: new BigNumber('1.5'),
  },
]

const totalValueAllocations = [
  {
    coin: Coin.DAI,
    strategy: Strategy.Aave,
    percentage: new BigNumber('30'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Aave,
    percentage: new BigNumber('50'),
  },

  {
    coin: Coin.DAI,
    strategy: Strategy.Convex,
    percentage: new BigNumber('10'),
  },
  {
    coin: Coin.USDC,
    strategy: Strategy.Convex,
    percentage: new BigNumber('10'),
  },
]

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

describe('weighted APYs calculator', () => {
  it('should calculate weighted strategy APYs by summing different APY types and weighting with value allocation', () => {
    const result = weightedAPYsCalculator(totalValueAllocations, strategyAPYs)

    expect(result).toEqual(weightedAPYs)
  })

  it('should calculate weighted strategy APYs if total value is 0', () => {
    const emptyAllocations = totalValueAllocations.map((allocation) => ({
      ...allocation,
      percentage: new BigNumber('0'),
    }))

    const emptyWeightedAPYs = weightedAPYsCalculator(
      emptyAllocations,
      strategyAPYs,
    )

    emptyWeightedAPYs.forEach(({ APY }) => {
      expect(APY).toEqual(new BigNumber('0'))
    })
  })
})
