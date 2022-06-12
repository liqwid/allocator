import { getArgs } from './getArgs'

export enum AllocatorMode {
  AUTO = 'AUTO',
  MANUAL = 'MANUAL',
}

export const getMode = (): AllocatorMode =>
  getArgs().auto ? AllocatorMode.AUTO : AllocatorMode.MANUAL
