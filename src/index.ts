import { allocationCsvParser } from 'utils/allocationCsvParser'
import { calculateAPY } from 'Controller'
import { printResults } from 'utils/printResults'
import { readAllocationsFile } from 'utils/readAllocationsFile'

const file = readAllocationsFile()
const allocation = allocationCsvParser(file)
const results = calculateAPY(allocation)

printResults(results)
