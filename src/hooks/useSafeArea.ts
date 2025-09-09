import Taro from '@tarojs/taro'
import { isNotNil } from 'es-toolkit'
import { useMemo } from 'react'

// 获取安全区域信息
export function useSafeArea() {
  const res = useMemo(() => {
    const windowInfo = Taro.getWindowInfo()
    const safeArea = Taro.getWindowInfo().safeArea
    const btnRect = Taro.getMenuButtonBoundingClientRect()

    // 安全域顶部距离高度
    const top = windowInfo.safeArea?.top || 0
    // 安全域底部距离高度
    const bottom = isNotNil(windowInfo.safeArea?.bottom) ? windowInfo.screenHeight - windowInfo.safeArea.bottom : 0
    // 安全域的宽度
    const width = windowInfo.screenWidth
    // 安全域的高度
    const height = windowInfo.screenHeight - top - bottom

    // 右上角胶囊按钮高度
    const btnHeight = btnRect.height
    // 右上角胶囊上下间隙
    const btnSpacing = btnRect.top - top

    // 右上角胶囊所在位置可用的宽度
    // 也是右上角胶囊按钮距离左侧的距离
    const btnLineWidth = btnRect.left

    return {
      top,
      bottom,
      width,
      height,
      btnHeight,
      btnSpacing,
      btnLineWidth,

      // 原始数据
      windowInfo,
      safeArea,
      btnRect,
    }
  }, [])

  return res
}
