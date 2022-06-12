import { CalculateAPYResult } from 'models/CalculateAPYResult'

export const printAPYResults = ({
  projectedAPY,
  weightedAPYs,
}: CalculateAPYResult): void => {
  console.log(
    `\nProjected APY: ${projectedAPY.decimalPlaces(2).toString()}%\n\n`,
  )

  console.log('Weighted APY: \n')

  weightedAPYs.forEach(({ coin, strategy, APY }) => {
    console.log(`${coin} ${strategy}: ${APY.decimalPlaces(2).toString()}%\n`)
  })

  console.log('')
}
