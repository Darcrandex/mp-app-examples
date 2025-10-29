import IconFont from '@/components/IconFont'
import { useSafeArea } from '@/hooks/useSafeArea'
import TabBar from '@/pages/(cocktail)/components/TabBar'
import { rankList, recommendList } from '@/pages/(cocktail)/mock/data'
import { useQuery } from '@tanstack/react-query'
import { ScrollView, Image as TaroImage } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './styles.css'

export default function Home() {
  const { top, btnHeight, btnSpacing } = useSafeArea()

  // ranks
  const { data: ranks = [] } = useQuery({
    queryKey: ['ranks'],
    queryFn: async () => {
      return rankList
    },
  })

  const { data: list = [] } = useQuery({
    queryKey: ['list'],
    queryFn: async () => {
      return recommendList
    },
  })

  return (
    <>
      <div style={{ height: top + btnHeight + btnSpacing }}></div>

      <h1 className='mx-6 text-3xl font-extrabold tracking-wider'>Cocktail World</h1>
      <p className='mx-6 mt-2 text-sm text-gray-800'>在鸡尾酒时间找到适合你的</p>

      <div className='m-6' onClick={() => Taro.navigateTo({ url: '/pages/(cocktail)/pages/item-detail/index?id=1' })}>
        <TaroImage
          src='https://c-ssl.duitang.com/uploads/blog/202311/03/2YSalpzpf68pOMA.jpeg'
          mode='scaleToFill'
          className='h-xl w-full rounded-2xl object-cover'
        />
      </div>

      <h2 className='mx-6 mt-6 text-lg font-bold tracking-wider'>热度排行</h2>
      <p className='mx-6 text-sm text-gray-500'>近期最受达人喜欢的鸡尾酒</p>

      <section className='m-6'>
        <ScrollView scrollX>
          <ul className='flex flex-row items-center justify-between gap-2'>
            {ranks.map((item) => (
              <li
                key={item.id}
                className='rounded-lg px-4 py-2 text-center text-white'
                style={{ backgroundColor: item.color }}
                onClick={() => Taro.navigateTo({ url: `/pages/(cocktail)/pages/item-detail/index?id=${item.id}` })}
              >
                <p className='text-xs whitespace-nowrap'>{item.subName}</p>
                <p className='whitespace-nowrap'>{item.name}</p>
              </li>
            ))}
          </ul>
        </ScrollView>
      </section>

      <h2 className='mx-6 mt-6 text-lg font-bold tracking-wider'>经典推荐</h2>
      <p className='mx-6 text-sm text-gray-500'>不可错过这10杯经典鸡尾酒</p>

      <ul className='mx-6 mt-10 mb-6 space-y-12'>
        {list.map((item) => (
          <li
            key={item.id}
            className='ui-item-container flex gap-4 rounded-2xl bg-white p-4'
            onClick={() => Taro.navigateTo({ url: `/pages/(cocktail)/pages/item-detail/index?id=${item.id}` })}
          >
            <div className='relative w-1/2'>
              <TaroImage
                src={item.cover}
                mode='scaleToFill'
                className='absolute bottom-0 left-0 h-[120%] w-full rounded-2xl object-cover'
              />
            </div>

            <article className='flex-1'>
              <p className='text-gray-500'>{item.subName}</p>
              <p className='text-lg'>{item.name}</p>

              <ol className='my-4 flex flex-col items-start gap-2'>
                {item.tags.slice(0, 3).map((tag) => (
                  <li key={tag} className='rounded-4xl bg-rose-100 px-2 py-1 text-xs text-gray-800'>
                    {tag}
                  </li>
                ))}
              </ol>

              <footer className='flex gap-4'>
                <p className='flex items-center gap-1'>
                  <IconFont name='icon-time-fill' />
                  <span className='text-xs font-bold text-gray-800'>{item.time}</span>
                </p>
                <p className='flex items-center gap-1'>
                  <IconFont name='icon-favorites-fill' className='text-orange-400' />
                  <span className='text-xs font-bold text-gray-800'>{item.stars}</span>
                </p>
              </footer>
            </article>
          </li>
        ))}
      </ul>

      <TabBar />
    </>
  )
}
