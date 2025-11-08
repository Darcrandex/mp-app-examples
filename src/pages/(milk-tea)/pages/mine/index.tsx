import IconFont from '@/components/IconFont'
import NavBar from '@/pages/(milk-tea)/components/NavBar'
import { Badge, Image } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { useMemo } from 'react'

export default function Mine() {
  const orderStatus = useMemo(() => {
    return [
      { name: '待付款', icon: 'icon-home', count: 2, status: 'waitPay' },
      { name: '待发货', icon: 'icon-home', count: 0, status: 'waitSend' },
      { name: '待收货', icon: 'icon-home', count: 0, status: 'waitReceive' },
      { name: '待评价', icon: 'icon-home', count: 0, status: 'waitComment' },
      { name: '已完成', icon: 'icon-home', count: 0, status: 'completed' },
      { name: '已取消', icon: 'icon-home', count: 0, status: 'cancelled' },
    ]
  }, [])

  const items = [
    { key: '1', name: '我的积分', icon: 'icon-home' },
    { key: '2', name: '我的优惠券', icon: 'icon-home' },
    { key: '3', name: '我的拼团', icon: 'icon-home' },
    { key: '4', name: '收货地址', icon: 'icon-home' },
    { key: '5', name: '申请开店', icon: 'icon-home' },
  ]

  return (
    <>
      <section className='bg-amber-200 p-px'>
        <div className='h-22'></div>

        <div className='m-6 flex items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-gray-100'>
            <Image className='h-full w-full rounded-full' />
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
          <span className='text-sm text-gray-500'>查看全部</span>
        </h2>

        <ScrollView scrollX className='mt-6'>
          <ul className='flex flex-nowrap gap-4'>
            {orderStatus.map((item) => (
              <li key={item.status} className='pt-2'>
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
