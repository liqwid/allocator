export const removeItemAtIndex = <T>(
  index: number,
  array: Array<T>,
): Array<T> =>
  array.slice(0, index).concat(array.slice(index + 1, array.length))
