import { createTaroSyncStorage } from '@/utils/taro-sync-storage'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const stateAtom = atomWithStorage('counter', 0, createTaroSyncStorage<number>())

export function useCounter() {
  return useAtom(stateAtom)
}
