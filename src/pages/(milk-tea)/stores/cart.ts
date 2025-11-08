import type { CartItem, Good } from '@/pages/(milk-tea)/types'
import { createTaroSyncStorage } from '@/utils/taro-sync-storage'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'

const stateAtom = atomWithStorage('cart-status', [], createTaroSyncStorage<CartItem[]>())

export function useCartStatus() {
  const [state, setState] = useAtom(stateAtom)

  const updateCount = useCallback(
    (good: Good, offsetCount: 1 | -1) => {
      setState((arr) => {
        const isExist = arr.find((item) => item.id === good.id)

        if (isExist) {
          const shouldRemove = (arr.find((item) => item.id === good.id)?.count || 0) + offsetCount <= 0
          if (shouldRemove) {
            return arr.filter((item) => item.id !== good.id)
          }

          return arr.map((item) => (item.id === good.id ? { ...item, count: item.count + offsetCount } : item))
        } else {
          return [...arr, { ...good, count: offsetCount, selected: true }]
        }
      })
    },
    [setState],
  )

  const toggleSelected = useCallback(
    (good: Good) => {
      setState((arr) => arr.map((item) => (item.id === good.id ? { ...item, selected: !item.selected } : item)))
    },
    [setState],
  )

  const totalPrice = state.filter((v) => v.selected).reduce((acc, cur) => acc + cur.count * cur.price, 0)

  return { list: state, setList: setState, updateCount, toggleSelected, totalPrice }
}
