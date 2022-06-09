import BigNumber from 'bignumber.js'
import { Coin } from 'models'
import { coinDistributionProvider } from 'providers/coinDistributionProvider'
import { percentageDistributionCalculator } from './percentageDistributionCalculator'

jest.mock('providers/coinDistributionProvider')

describe('Coin distribution calculator', () => {
  it('should get coin distribution from provider', () => {
    percentageDistributionCalculator()

    expect(coinDistributionProvider).toBeCalledTimes(1)
  })

  it('should calculate percentage distribution between coins', () => {
    ;(coinDistributionProvider as jest.Mock).mockImplementationOnce(() => [
      { coin: Coin.DAI, amount: new BigNumber('10000') },
      { coin: Coin.USDC, amount: new BigNumber('40000') },
      { coin: Coin.USDT, amount: new BigNumber('50000') },
    ])

    const result = percentageDistributionCalculator()

    expect(result).toEqual([
      { coin: Coin.DAI, percentage: new BigNumber('10') },
      { coin: Coin.USDC, percentage: new BigNumber('40') },
      { coin: Coin.USDT, percentage: new BigNumber('50') },
    ])
  })

  it('should calculate percentage distribution when one coin amount is 0', () => {
    ;(coinDistributionProvider as jest.Mock).mockImplementationOnce(() => [
      { coin: Coin.DAI, amount: new BigNumber('0') },
      { coin: Coin.USDC, amount: new BigNumber('50000') },
      { coin: Coin.USDT, amount: new BigNumber('50000') },
    ])

    const result = percentageDistributionCalculator()

    expect(result).toEqual([
      { coin: Coin.DAI, percentage: new BigNumber('0') },
      { coin: Coin.USDC, percentage: new BigNumber('50') },
      { coin: Coin.USDT, percentage: new BigNumber('50') },
    ])
  })

  it('should calculate percentage distribution when one all amounts are 0', () => {
    ;(coinDistributionProvider as jest.Mock).mockImplementationOnce(() => [
      { coin: Coin.DAI, amount: new BigNumber('0') },
      { coin: Coin.DAI, amount: new BigNumber('0') },
      { coin: Coin.DAI, amount: new BigNumber('0') },
    ])

    const result = percentageDistributionCalculator()

    expect(result).toEqual([
      { coin: Coin.DAI, percentage: new BigNumber('0') },
      { coin: Coin.DAI, percentage: new BigNumber('0') },
      { coin: Coin.DAI, percentage: new BigNumber('0') },
    ])
  })
})
