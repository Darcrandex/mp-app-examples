import IconFont from '@/components/IconFont'
import { useElementRect } from '@/hooks/useElementRect'
import { useCartStatus } from '@/pages/(milk-tea)/stores/cart'
import { cls } from '@/utils/cls'
import Taro, { useRouter } from '@tarojs/taro'
import { delay } from 'es-toolkit'
import React, { useEffect } from 'react'

const elId = 'milk-tea_cart-widget'

export default function CartWidget(props: {
  className?: string
  style?: React.CSSProperties
  onRect?: (rect: Taro.NodesRef.BoundingClientRectCallbackResult) => void
}) {
  const rect = useElementRect(elId)
  useEffect(() => {
    props.onRect?.(rect)
  }, [props, rect])

  const { totalPrice, setList } = useCartStatus()
  const pathname = useRouter().path
  const onNavigate = () => {
    if (pathname !== '/pages/(milk-tea)/pages/cart/index') {
      Taro.redirectTo({ url: '/pages/(milk-tea)/pages/cart/index' })
    }
  }

  const onPay = async () => {
    if (totalPrice === 0) {
      Taro.showToast({ title: '还没有选择商品哦', duration: 1000, icon: 'none' })
      return
    }

    console.log('ok')
    setList([])
    Taro.showToast({ title: '下单成功', duration: 1000, icon: 'none' })
    await delay(1000)
    Taro.navigateTo({ url: '/pages/(milk-tea)/pages/orders/index' })
  }

  return (
    <>
      <div
        id={elId}
        className={cls('fixed right-0 left-0 flex items-center gap-2 bg-white px-6 py-4', props.className)}
        style={props.style}
        onClick={onNavigate}
      >
        <IconFont name='icon-cart-empty' className='text-xl text-amber-300' />

        <span className='text-sm'>合计</span>
        <span className='flex-1 font-bold'>¥{totalPrice}</span>

        <span
          className='rounded-full bg-amber-300 px-4 py-1 text-sm text-white'
          onClick={(e) => {
            e.stopPropagation()
            onPay()
          }}
        >
          结算
        </span>
      </div>

      <div style={{ height: rect.height }}></div>
    </>
  )
}
