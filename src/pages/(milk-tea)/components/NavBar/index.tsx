import IconFont from '@/components/IconFont'
import { useElementRect } from '@/hooks/useElementRect'
import { useSafeArea } from '@/hooks/useSafeArea'
import { cls } from '@/utils/cls'
import Taro, { useRouter } from '@tarojs/taro'
import { useCallback, useEffect } from 'react'
import './styles.css'

const tabs = [
  {
    name: '首页',
    path: '/pages/(milk-tea)/pages/home/index',
    icon: 'icon-home',
  },
  {
    name: '分类',
    path: '/pages/(milk-tea)/pages/category/index',
    icon: 'icon-all',
  },
  {
    name: '购物车',
    path: '/pages/(milk-tea)/pages/cart/index',
    icon: 'icon-cart-empty',
  },
  {
    name: '我的',
    path: '/pages/(milk-tea)/pages/mine/index',
    icon: 'icon-customer',
  },
]

const elId = 'milk-tea_bottom-bar'
export default function NavBar(props: { onRect?: (rect: Taro.NodesRef.BoundingClientRectCallbackResult) => void }) {
  const bottomRect = useElementRect(elId)

  useEffect(() => {
    props.onRect?.(bottomRect)
  }, [bottomRect, props, props.onRect])

  const { bottom } = useSafeArea()
  const pathname = useRouter().path

  const isActive = useCallback(
    (path: string) => {
      return pathname.startsWith(path)
    },
    [pathname],
  )

  return (
    <>
      <footer id={elId} className='fixed right-0 bottom-0 left-0 z-50 overflow-hidden bg-white'>
        <div className='relative flex items-center'>
          {tabs.map((item) => (
            <div
              key={item.path}
              className={cls(
                'flex flex-1 flex-col items-center justify-center py-2',
                isActive(item.path) ? 'text-amber-300' : 'text-gray-800',
              )}
              onClick={() => Taro.redirectTo({ url: item.path })}
            >
              <IconFont name={item.icon} className='text-xl' />
              <span className='text-xs leading-none'>{item.name}</span>
            </div>
          ))}
        </div>

        <div className='' style={{ height: bottom || 10 }}></div>
      </footer>
      <div style={{ height: bottomRect.height }}></div>
    </>
  )
}
