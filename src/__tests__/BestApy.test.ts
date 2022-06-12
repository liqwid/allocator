import BigNumber from 'bignumber.js'
import { keyBy, groupBy, pipe, mapValues } from 'lodash/fp'

import { Coin, CoinAllocation } from 'models'
import { getBestAPY } from 'BestAPYController'
import { calculateAPY } from 'APYCalculationController'

describe('Best APY allocation service', () => {
  it('should determine best APY allocation', () => {
    const { allocation } = getBestAPY()
    const APYResult = calculateAPY(allocation)

    expect(APYResult.projectedAPY.decimalPlaces(2)).toEqual(
      new BigNumber('3.37'),
    )

    const { Aave, Compound, Convex } = pipe(
      groupBy('strategy'),
      mapValues(keyBy<CoinAllocation>('coin')),
    )(allocation)

    expect(Aave[Coin.DAI].percentage).toEqual(new BigNumber('0'))
    expect(Aave[Coin.USDC].percentage).toEqual(new BigNumber('0'))
    expect(Aave[Coin.USDT].percentage).toEqual(new BigNumber('0'))

    expect(Compound[Coin.DAI].percentage).toEqual(new BigNumber('100'))
    expect(Compound[Coin.USDC].percentage).toEqual(new BigNumber('0'))
    expect(Compound[Coin.USDT].percentage).toEqual(new BigNumber('100'))

    expect(Convex[Coin.DAI].percentage).toEqual(new BigNumber('0'))
    expect(Convex[Coin.USDC].percentage).toEqual(new BigNumber('100'))
    expect(Convex[Coin.USDT].percentage).toEqual(new BigNumber('0'))
  })
})
