import { CalculateAPYResult } from 'models/CalculateAPYResult'

export const printResults = ({
  projectedAPY,
  weightedAPYs,
}: CalculateAPYResult): void => {
  console.log(`Projected APY: ${projectedAPY.decimalPlaces(2).toString()}%\n\n`)

  console.log('Weighted APY: \n')

  weightedAPYs.forEach(({ coin, strategy, APY }) => {
    console.log(`${coin} ${strategy}: ${APY.decimalPlaces(2).toString()}%\n`)
  })
}
