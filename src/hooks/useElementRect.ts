import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

// 获取元素的尺寸和位置信息
export function useElementRect(elementId: string) {
  const [rect, setRect] = useState<Taro.NodesRef.BoundingClientRectCallbackResult>({
    id: elementId,
    dataset: {},
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  })

  useEffect(() => {
    if (!elementId) return

    const query = Taro.createSelectorQuery()

    query
      .select(`#${elementId}`)
      .boundingClientRect((rect) => {
        if (Array.isArray(rect) && rect.length > 0) {
          setRect(rect[0])
        }

        if (!Array.isArray(rect)) {
          setRect(rect)
        }
      })
      .exec()
  }, [elementId])

  return rect
}
