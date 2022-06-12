import minimist from 'minimist'

export const getArgs = (): minimist.ParsedArgs => {
  return minimist(process.argv.slice(2))
}
