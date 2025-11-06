import NavBar from '@/pages/(milk-tea)/components/NavBar'
import { useQuery } from '@tanstack/react-query'
import { Image, Swiper } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import { range } from 'es-toolkit'

export default function Home() {
  const { data: bannerList = [] } = useQuery({
    queryKey: ['home', 'banner', 'list'],
    queryFn: async () => {
      const items = Array.from({ length: 3 }, (_, index) => ({
        id: `banner-${index}`,
        image: 'https://tse3.mm.bing.net/th/id/OIP.tQgxUPiEBQsfJ2qkgCSSQgHaF0?rs=1&pid=ImgDetMain&o=7&rm=3',
      }))
      return items
    },
  })

  const { data: topList = [] } = useQuery({
    queryKey: ['home', 'top', 'list'],
    queryFn: async () => {
      const items = Array.from({ length: 3 }, (_, index) => ({
        id: `product-${index}`,
        image: 'https://tse2.mm.bing.net/th/id/OIP.W2GWB1XQKJPMEcTez8ru1wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      }))
      return items
    },
  })

  // 套餐
  const { data: packageList = [] } = useQuery({
    queryKey: ['home', 'package', 'list'],
    queryFn: async () => {
      const groups = range(2).map((g) => {
        const items = range(5).map((v) => {
          return {
            id: `package-${g}-${v}`,
            image: 'https://tse2.mm.bing.net/th/id/OIP.W2GWB1XQKJPMEcTez8ru1wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
            name: `奶茶${g * 5 + v + 1}`,
            price: Math.floor(Math.random() * 5 + 5),
          }
        })

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
    <>
      <Swiper autoplay={5000} className='h-96'>
        <Swiper.Indicator />
        {bannerList.map((item) => (
          <Swiper.Item key={item.id}>
            <Image src={item.image} className='h-96 w-full' mode='aspectFill' />
          </Swiper.Item>
        ))}
      </Swiper>

      <section className='ui-shadow m-6 flex justify-around rounded-md p-4'>
        <div className='flex flex-col items-center gap-2'>
          <div className='h-12 w-12 bg-amber-300'></div>
          <p>门店自取</p>
          <p className='text-xs text-gray-500'>在线预约, 到店自取</p>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <div className='h-12 w-12 bg-amber-300'></div>
          <p>外卖</p>
          <p className='text-xs text-gray-500'>无接触配送, 准时达</p>
        </div>
      </section>

      <section className='m-6 grid grid-cols-3 gap-4'>
        {topList.map((item) => (
          <div key={item.id} className='h-40 overflow-hidden rounded-md'>
            <Image src={item.image} className='h-full w-full' mode='aspectFill' />
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
    </>
  )
}
