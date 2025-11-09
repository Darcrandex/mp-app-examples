import TopBar from '@/pages/(milk-tea)/components/TopBar'
import { useQuery } from '@tanstack/react-query'
import { Image } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { range } from 'es-toolkit'

export default function Orders() {
  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: () => {
      return range(2).map((v) => ({
        id: `order-${v}`,
        status: 'completed',
        statusText: '已完成',
        price: 666,
        totalCount: 5,
        date: '2023-06-13 15:00:00',
        items: [
          {
            cid: 2,
            id: 201,
            name: '草莓奶盖茶',
            price: 18,
            count: 1,
            cover: 'https://img1.jiemian.com/101/original/20200409/158640916575469700_a700x398.jpg',
          },
          {
            cid: 2,
            id: 202,
            name: '芒果多多奶茶',
            price: 17,
            count: 1,
            cover: 'https://picx.zhimg.com/v2-3ba6b08912f7886d8325f67945c0db2c_720w.jpg?source=172ae18b',
          },
          {
            cid: 3,
            id: 302,
            name: '黑糖脏脏茶',
            price: 20,
            cover: 'https://pic2.zhimg.com/v2-8764d354e7a177a7c39892cc4c7b50d2_r.jpg',
          },
          {
            cid: 3,
            id: 303,
            name: '烧仙草全家福',
            price: 22,
            cover: 'https://aimg8.dlssyht.cn/u/2011304/ueditor/image/1006/2011304/1630590074369688.jpg',
          },
          {
            cid: 3,
            id: 304,
            name: '芋泥波波奶茶',
            price: 21,
            cover: 'https://img.shetu66.com/2023/06/13/1686644021485545.png',
          },
        ],
      }))
    },
  })

  return (
    <section className='min-h-screen bg-gray-100'>
      <TopBar title='我的订单' />

      <ol>
        {orders.map((order) => (
          <li key={order.id} className='ui-shadow m-6 space-y-2 rounded-md bg-white p-4'>
            <header className='mb-2 flex items-center justify-between text-xs'>
              <span>{order.date}</span>
              <span className='text-gray-500'>{order.statusText}</span>
            </header>

            <ScrollView scrollX showScrollbar={false} enhanced>
              <ul className='flex flex-nowrap gap-2'>
                {order.items.map((v) => (
                  <li key={v.id}>
                    <div className='h-20 w-20 overflow-hidden rounded-lg'>
                      <Image src={v.cover} className='h-full w-full' mode='aspectFill' />
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollView>

            <footer className='mt-2 flex items-center gap-2 text-xs'>
              <span className='flex-1'>
                共 {order.totalCount} 件商品，合计 ¥{order.price.toFixed(2)}
              </span>
            </footer>
          </li>
        ))}
      </ol>
    </section>
  )
}
