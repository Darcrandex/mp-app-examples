import IconFont from '@/components/IconFont'
import { useElementRect } from '@/hooks/useElementRect'
import { useSafeArea } from '@/hooks/useSafeArea'
import { cls } from '@/utils/cls'
import Taro, { useRouter } from '@tarojs/taro'
import { useCallback } from 'react'
import './styles.css'

const tabs = [
  { name: '经典', path: '/pages/(cocktail)/pages/home/index', icon: 'icon-home' },
  { name: '我的', path: '/pages/(cocktail)/pages/mine/index', icon: 'icon-customer' },
]

export default function TabBar() {
  const bottomRect = useElementRect('bottom-bar')
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
      <footer id='bottom-bar' className='fixed right-0 bottom-0 left-0 z-50 overflow-hidden bg-white'>
        <div className='relative flex items-center'>
          {tabs.map((item) => (
            <div
              key={item.path}
              className={cls(
                'flex flex-1 flex-col items-center justify-center py-2',
                isActive(item.path) ? 'text-rose-400' : 'text-gray-800',
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
