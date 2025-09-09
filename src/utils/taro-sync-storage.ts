import Taro from '@tarojs/taro'
import type { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage'

// 基于 Taro.setStorageSync 实现 atom 接口
export function createTaroSyncStorage<T = any>(): SyncStorage<T> {
  return {
    getItem: (key: string, initialValue?: any) => {
      // 如果初始化时，获取不到值
      // Taro 会返回一个空的字符串
      const data = Taro.getStorageSync(key)
      return data || initialValue
    },
    setItem: (key: string, value: any) => Taro.setStorageSync(key, value),
    removeItem: (key: string) => Taro.removeStorageSync(key),
  }
}
