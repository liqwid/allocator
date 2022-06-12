import { allocationCsvParser } from 'cli/allocationCsvParser'
import { calculateAPY } from 'APYCalculationController'
import { printAPYResults } from 'cli/printAPYResults'
import { readAllocationsFile } from 'cli/readAllocationsFile'
import { AllocatorMode, getMode } from 'cli/AllocatorMode'
import { getBestAPY } from 'BestAPYController'
import { printAllocationResult } from 'cli/printAllocationResults'

const determineBestAPY = () => {
  const { APYResult: APYResults, allocation } = getBestAPY()
  printAllocationResult(allocation)
  printAPYResults(APYResults)
}

const calculateAllocationAPY = () => {
  const file = readAllocationsFile()
  const allocation = allocationCsvParser(file)
  const results = calculateAPY(allocation)
  printAPYResults(results)
}

const mode = getMode()

if (mode === AllocatorMode.MANUAL) calculateAllocationAPY()
if (mode === AllocatorMode.AUTO) determineBestAPY()
