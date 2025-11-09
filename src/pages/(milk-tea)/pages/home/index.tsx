import NavBar from '@/pages/(milk-tea)/components/NavBar'
import { bannerData, newItemsData, packItemData } from '@/pages/(milk-tea)/mock'
import { useQuery } from '@tanstack/react-query'
import { Image, Swiper } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { range } from 'es-toolkit'

import img1 from '@/pages/(milk-tea)/assets/home-tab-1.jpg'
import img2 from '@/pages/(milk-tea)/assets/home-tab-2.jpg'
import './styles.css'

const tabs = [
  { title: '门店自取', desc: '在线预约，到店自取', image: img1 },
  { title: '线上订单', desc: '无接触配送，准时达', image: img2 },
]

export default function Home() {
  const { data: bannerList = [] } = useQuery({
    queryKey: ['home', 'banner', 'list'],
    queryFn: async () => {
      return bannerData
    },
  })

  const { data: topList = [] } = useQuery({
    queryKey: ['home', 'top', 'list'],
    queryFn: async () => {
      return newItemsData
    },
  })

  // 套餐
  const { data: packageList = [] } = useQuery({
    queryKey: ['home', 'package', 'list'],
    queryFn: async () => {
      const groups = range(3).map((g) => {
        const items = packItemData

        const totalPrice = items.reduce((acc, cur) => acc + cur.price, 0)
        return {
          id: `package-${g}`,
          name: `套餐${g + 1}`,
          items,
          totalPrice,
          price: 0.8 * totalPrice,
        }
      })

      return groups
    },
  })

  return (
    <section className='min-h-screen bg-slate-100'>
      <div className='milk-tea-home-banner'>
        <Swiper autoplay={5000} style={{ height: 520 }}>
          {bannerList.map((item) => (
            <Swiper.Item key={item.id}>
              <Image src={item.imageUrl} className='w-full' mode='aspectFill' style={{ height: 520 }} />
            </Swiper.Item>
          ))}
        </Swiper>

        <div className='milk-tea-home-banner_cover'></div>
      </div>

      <section className='ui-shadow relative z-10 mx-6 -mt-10 mb-6 flex justify-around rounded-md bg-white p-4'>
        {tabs.map((item) => (
          <div key={item.title} className='flex flex-col items-center'>
            <div className='mb-4 h-16 w-16'>
              <Image src={item.image} className='h-full w-full' mode='aspectFit' />
            </div>
            <p>{item.title}</p>
            <p className='text-xs text-gray-500'>{item.desc}</p>
          </div>
        ))}
      </section>

      <h2 className='m-6 text-lg font-bold italic'>本月新品</h2>

      <section className='m-6 grid grid-cols-3 gap-4'>
        {topList.map((item) => (
          <div key={item.id} className='h-40 overflow-hidden rounded-md'>
            <Image src={item.imageUrl} className='h-full w-full' mode='aspectFill' />
          </div>
        ))}
      </section>

      <h2 className='m-6 text-lg font-bold italic'>热门套餐</h2>

      {packageList.map((g) => (
        <section key={g.id} className='ui-shadow m-6 rounded-md bg-white p-4'>
          <ScrollView scrollX>
            <ol className='flex flex-nowrap gap-4'>
              {g.items.map((item) => (
                <li key={item.id}>
                  <div className='h-28 w-28 overflow-hidden rounded-md'>
                    <Image src={item.image} className='h-full w-full' mode='aspectFill' />
                  </div>
                  <p className='mt-2 truncate text-xs text-gray-500'>{item.name}</p>
                </li>
              ))}
            </ol>
          </ScrollView>

          <footer className='mt-4 flex items-center gap-2'>
            <span className='text-sm'>{g.name}</span>
            <span className='font-bold text-amber-300'>¥{g.price.toFixed(2)}</span>
            <span className='text-sm text-gray-500 line-through'>¥{g.totalPrice.toFixed(2)}</span>
            <span className='ui-shadow ml-auto rounded-4xl bg-amber-300 px-4 py-1 text-sm text-white'>立即购买</span>
          </footer>
        </section>
      ))}

      <NavBar />
    </section>
  )
}
