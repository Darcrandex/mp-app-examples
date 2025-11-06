import { useLaunch } from '@tarojs/taro'
import { PropsWithChildren } from 'react'

import '@/assets/iconfont/iconfont.css'
import QueryProvider from '@/components/QueryProvider'
import Taro from '@tarojs/taro'

import './app.css'

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.')

    // 初始化云函数
    Taro.cloud.init()
  })

  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  )
}

export default App
