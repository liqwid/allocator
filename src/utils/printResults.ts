import { CalculateAPYResult } from 'models/CalculateAPYResult'

export const printResults = ({
  projectedAPY,
  weightedAPYs,
}: CalculateAPYResult): void => {
  console.log(`Projected APY: ${projectedAPY}\n\n`)

  console.log('Weighted APYS: \n')

  weightedAPYs.forEach(({ coin, strategy, APY }) => {
    console.log(`${coin} ${strategy}: ${APY.decimalPlaces(2).toString()}%\n`)
  })
}
