import IconFont from '@/components/IconFont'
import { useElementRect } from '@/hooks/useElementRect'
import { useSafeArea } from '@/hooks/useSafeArea'
import { recommendList } from '@/pages/(cocktail)/mock/data'
import { useQuery } from '@tanstack/react-query'
import { Image as TaroImage } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState } from 'react'

export default function ItemDetail() {
  const { top, btnHeight, btnSpacing } = useSafeArea()
  const headerRect = useElementRect('header')

  const { id } = useRouter().params || {}
  const { data } = useQuery({
    queryKey: ['item', 'detail', id],
    queryFn: () => {
      return recommendList.find((item) => item.id === id)
    },
  })

  const [isFavorite, setIsFavorite] = useState(() => Math.random() > 0.5)

  return (
    <>
      <TaroImage
        src={data?.cover || ''}
        mode='aspectFill'
        className='fixed top-0 right-0 left-0 h-[60vh] w-full object-cover'
      />

      <header id='header' className='fixed top-0 right-0 left-0 z-10' style={{ paddingTop: top }}>
        <section
          style={{ height: btnHeight, paddingTop: btnSpacing, paddingBottom: btnSpacing }}
          className='flex items-center text-white'
          onClick={() => Taro.navigateBack()}
        >
          <span className='w-1/4'>
            <IconFont name='icon-left-arrow' className='ml-6 text-lg' />
          </span>
          <h2 className='w-1/2 truncate text-center'>{data?.name}</h2>
          <span className='w-1/4'></span>
        </section>
      </header>
      <div style={{ height: headerRect.height }}></div>

      <section className='relative z-20'>
        <div className='h-40'></div>

        <div className='m-6 flex'>
          <div className='flex gap-4 rounded-2xl bg-white/50 px-2 py-1'>
            <p className='flex items-center gap-1'>
              <IconFont name='icon-time-fill' />
              <span className='text-xs font-bold text-gray-800'>{data?.time}</span>
            </p>
            <p className='flex items-center gap-1'>
              <IconFont name='icon-favorites-fill' className='text-orange-400' />
              <span className='text-xs font-bold text-gray-800'>{data?.stars}</span>
            </p>
          </div>
        </div>

        <article className='relative rounded-4xl bg-white p-6'>
          <div className='ui-shadow absolute -top-4 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-white'>
            <IconFont
              name={isFavorite ? 'icon-follow-fill' : 'icon-follow'}
              className='text-3xl text-rose-400'
              onClick={() => setIsFavorite(!isFavorite)}
            />
          </div>

          <p className='text-gray-500'>{data?.subName}</p>
          <p className='text-lg'>{data?.name}</p>

          <ol className='my-4 flex gap-2'>
            {data?.tags.map((tag) => (
              <li key={tag} className='rounded-4xl bg-rose-100 px-2 py-1 text-xs text-gray-800'>
                {tag}
              </li>
            ))}
          </ol>

          <hr className='my-6 h-px bg-gray-300' />
          <p className='text-gray-800'>{data?.remark}</p>

          <hr className='my-6 h-px bg-gray-300' />
          <ul className='flex flex-col gap-2'>
            {data?.ingredient.map((v) => (
              <li key={v} className='text-gray-800'>
                {v}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )
}
