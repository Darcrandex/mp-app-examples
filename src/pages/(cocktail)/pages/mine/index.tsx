import IconFont from '@/components/IconFont'
import { useSafeArea } from '@/hooks/useSafeArea'
import TabBar from '@/pages/(cocktail)/components/TabBar'
import { Image as TaroImage } from '@tarojs/components'
import './styles.css'

export default function Mine() {
  const { top, btnHeight, btnSpacing } = useSafeArea()

  return (
    <>
      <section className='ui-mine-bg pb-1'>
        <header style={{ height: top + btnHeight + 2 * btnSpacing }}></header>

        <section className='m-6 flex items-center'>
          <article className='flex-1 text-white'>
            <p className='text-3xl font-extrabold'>Anna Su</p>
            <p className='text-lg text-gray-100'>188****1289</p>
          </article>

          <div className='flex shrink-0 items-center justify-center rounded-full bg-white p-0.5'>
            <TaroImage
              src='https://c-ssl.duitang.com/uploads/blog/202509/23/73SJnaqjHemZwaq.jpeg'
              className='h-24 w-24 rounded-full'
              mode='scaleToFill'
            />
          </div>
        </section>

        <section className='m-6 grid grid-cols-4 gap-4'>
          <div className='text-white'>
            <p className='text-2xl font-bold'>23</p>
            <p className='text-sm'>我的关注</p>
          </div>
          <div className='text-white'>
            <p className='text-2xl font-bold'>67</p>
            <p className='text-sm'>我的发帖</p>
          </div>
          <div className='text-white'>
            <p className='text-2xl font-bold'>304</p>
            <p className='text-sm'>积分奖励</p>
          </div>
          <div className='flex items-end'>
            <p className='rounded-full bg-black/10 px-2 text-white'>Lv.01</p>
          </div>
        </section>
      </section>

      <ul className='m-6'>
        <li className='flex items-center justify-between border-0 border-b border-solid border-gray-200 py-4'>
          <span className='flex-1 text-gray-800'>我的收藏</span>
          <IconFont name='icon-right' className='text-lg text-gray-500' />
        </li>
        <li className='flex items-center justify-between border-0 border-b border-solid border-gray-200 py-4'>
          <span className='flex-1 text-gray-800'>我的评论</span>
          <IconFont name='icon-right' className='text-lg text-gray-500' />
        </li>
        <li className='flex items-center justify-between border-0 border-b border-solid border-gray-200 py-4'>
          <span className='flex-1 text-gray-800'>用户设置</span>
          <IconFont name='icon-right' className='text-lg text-gray-500' />
        </li>
      </ul>

      <TabBar />
    </>
  )
}
