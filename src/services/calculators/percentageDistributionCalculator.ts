import BigNumber from 'bignumber.js'
import { CoinPercentageDistribution } from 'models'
import { coinDistributionProvider } from 'providers/coinDistributionProvider'
import { sumBigNumberArray } from 'utils'

export const percentageDistributionCalculator =
  (): CoinPercentageDistribution[] => {
    const coinDistributions = coinDistributionProvider()

    const totalAmount = sumBigNumberArray(
      coinDistributions.map(({ amount }) => amount),
    )

    if (totalAmount.isEqualTo(0))
      return coinDistributions.map(({ coin }) => ({
        coin,
        percentage: new BigNumber('0'),
      }))

    return coinDistributions.map(({ coin, amount }) => ({
      coin,
      percentage: amount.div(totalAmount).multipliedBy('100'),
    }))
  }
