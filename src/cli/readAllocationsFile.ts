import { readFileSync } from 'fs'
import { getArgs } from './getArgs'

export const readAllocationsFile = (): string => {
  const csvPath = getArgs().path || './allocations.csv'

  return readFileSync(csvPath, 'utf-8')
}
