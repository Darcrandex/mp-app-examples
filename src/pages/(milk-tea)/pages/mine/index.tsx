import IconFont from '@/components/IconFont'
import NavBar from '@/pages/(milk-tea)/components/NavBar'
import { Badge } from '@taroify/core'
import { Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useMemo } from 'react'

export default function Mine() {
  const orderStatus = useMemo(() => {
    return [
      { name: '待付款', count: 2, icon: 'icon-catalog' },
      { name: '待发货', count: 0, icon: 'icon-catalog-download' },
      { name: '待收货', count: 0, icon: 'icon-business-icon-feeds' },
      { name: '待评价', count: 0, icon: 'icon-order-upload' },
      { name: '已完成', count: 0, icon: 'icon-order-success' },
      { name: '已取消', count: 0, icon: 'icon-application-record' },
    ]
  }, [])

  const items = [
    { key: '1', name: '我的积分', icon: 'icon-money-rmb' },
    { key: '2', name: '我的优惠券', icon: 'icon-coupon' },
    { key: '3', name: '我的拼团', icon: 'icon-shopping' },
    { key: '4', name: '收货地址', icon: 'icon-logistics-data' },
    { key: '5', name: '申请开店', icon: 'icon-wangpuzhuangxiu' },
  ]

  return (
    <>
      <section className='relative p-px'>
        <Image
          src='https://xiuxiupro-material-center.meitudata.com/poster/a9bee5432b08e333eabd70866ddccabe.jpg'
          className='absolute right-0 left-0 h-full w-full'
          mode='aspectFill'
        />

        <div className='h-22'></div>

        <div className='relative z-10 m-6 flex items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-gray-100'>
            <Image
              className='h-full w-full rounded-full'
              src='https://p9.itc.cn/images01/20200528/1d2509759f7546a1b9ab4f6ff64250bc.jpeg'
              mode='aspectFill'
            />
          </div>

          <article className='flex-1'>
            <p className='text-lg'>张三</p>
            <p className='text-sm text-gray-500'>188****1234</p>
          </article>

          <IconFont name='icon-right' className='text-3xl text-gray-500' />
        </div>
      </section>

      <section className='ui-shadow m-6 rounded-md bg-white p-4'>
        <h2 className='flex items-center justify-between'>
          <span>我的订单</span>
          <span
            className='text-sm text-gray-500'
            onClick={() => Taro.navigateTo({ url: '/pages/(milk-tea)/pages/orders/index' })}
          >
            查看全部
          </span>
        </h2>

        <ScrollView scrollX className='mt-6'>
          <ul className='flex flex-nowrap gap-4'>
            {orderStatus.map((item) => (
              <li key={item.name} className='pt-2'>
                <div className='flex flex-col items-center justify-center gap-1'>
                  <Badge dot={item.count > 0}>
                    <IconFont name={item.icon} className='text-3xl' />
                  </Badge>

                  <p className='w-16 text-center text-xs'>{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollView>
      </section>

      <ol className='ui-shadow m-6 grid grid-cols-3 gap-4 rounded-md bg-white p-4'>
        {items.map((item) => (
          <li key={item.key} className='flex flex-col items-center justify-between'>
            <IconFont name={item.icon} className='text-3xl' />
            <span className='text-xs'>{item.name}</span>
          </li>
        ))}
      </ol>

      <NavBar />
    </>
  )
}
