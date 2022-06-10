import minimist from 'minimist'
import { readFileSync } from 'fs'

export const readAllocationsFile = (): string => {
  const csvPath = minimist(process.argv.slice(2)).path || './allocations.csv'

  return readFileSync(csvPath, 'utf-8')
}
