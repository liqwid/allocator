import { allocationCsvParser } from 'cli/allocationCsvParser'
import { calculateAPY } from 'Controller'
import { printResults } from 'cli/printResults'
import { readAllocationsFile } from 'cli/readAllocationsFile'
import { AllocatorMode, getMode } from 'cli/AllocatorMode'

const determineBestAPY = () => {
  throw Error('auto allocation not implemented')
}

const calculateAllocationAPY = () => {
  const file = readAllocationsFile()
  const allocation = allocationCsvParser(file)
  const results = calculateAPY(allocation)
  printResults(results)
}

const mode = getMode()

if (mode === AllocatorMode.MANUAL) calculateAllocationAPY()
if (mode === AllocatorMode.AUTO) determineBestAPY()
