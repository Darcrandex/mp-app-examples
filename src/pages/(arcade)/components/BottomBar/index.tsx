/**
 * @name BottomBar
 * @description
 * @author darcrand
 */

import IconFont from '@/components/IconFont'
import { useElementRect } from '@/hooks/useElementRect'
import { useSafeArea } from '@/hooks/useSafeArea'
import { Image as TaroImage } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useCallback } from 'react'
import './styles.less'

import imgTabsBg from 'src/pages/(arcade)/assets/images/tabs-top-bg.png' // 836*70

const tabs = [
  { name: '首页', path: '/pages/(arcade)/pages/home/index', icon: 'icon-home', activeIcon: 'icon-home-fill' },
  {
    name: '会员码',
    path: '/pages/(arcade)/pages/vip-code/index',
    icon: 'icon-qr-code',
    activeIcon: 'icon-qr-code',
    isCenter: true,
  },
  { name: '我的', path: '/pages/(arcade)/pages/mine/index', icon: 'icon-customer', activeIcon: 'icon-customer-fill' },
]

export default function BottomBar() {
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
      <footer
        id='bottom-bar'
        className='fixed right-0 bottom-0 left-0 z-50 overflow-hidden'
        style={{ paddingTop: '2.5vw' }}
      >
        <TaroImage
          src={imgTabsBg}
          mode='scaleToFill'
          className='absolute top-0 right-0 left-0'
          style={{ width: '100vw', height: '27vw' }}
        />

        <div className='relative flex items-center'>
          {tabs.map((item) =>
            item.isCenter ? (
              <div
                key={item.path}
                className='flex h-16 w-16 flex-col items-center justify-center rounded-full bg-green-300'
                onClick={() => Taro.navigateTo({ url: item.path })}
              >
                <IconFont name={item.icon} className='text-4xl text-gray-800' />
              </div>
            ) : (
              <div
                key={item.path}
                className='flex flex-1 flex-col items-center justify-center text-gray-800'
                onClick={() => Taro.redirectTo({ url: item.path })}
              >
                <IconFont name={isActive(item.path) ? item.activeIcon : item.icon} className='text-xl' />
                <span className='text-xs leading-none'>{item.name}</span>
              </div>
            ),
          )}
        </div>

        <div className='' style={{ height: bottom || 10 }}></div>
      </footer>

      <div style={{ height: bottomRect.height }}></div>
    </>
  )
}
