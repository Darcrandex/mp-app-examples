import CouponItem from '@/components/CouponItem'
import { useSafeArea } from '@/hooks/useSafeArea'
import CartWidget from '@/pages/(milk-tea)/components/CartWidget'
import GoodListItem from '@/pages/(milk-tea)/components/GoodListItem'
import NavBar from '@/pages/(milk-tea)/components/NavBar'
import { groupsData } from '@/pages/(milk-tea)/mock'
import { cls } from '@/utils/cls'
import { useQuery } from '@tanstack/react-query'
import { Image } from '@taroify/core'
import { ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useThrottleFn } from 'ahooks'
import { useEffect, useState } from 'react'

export default function Category() {
  const [navHeight, setNavHeight] = useState(0)
  const [widgetHeight, setWidgetHeight] = useState(0)
  const { top, btnHeight, btnSpacing, windowInfo } = useSafeArea()
  const scrollHeight = windowInfo.screenHeight - top - btnHeight - 2 * btnSpacing - navHeight - widgetHeight

  const [activeGroupId, setActiveGroupId] = useState(-1)
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      return groupsData
    },
  })

  useEffect(() => {
    setActiveGroupId(groups?.[0]?.id || -1)
  }, [groups])

  // UI
  const [intoViewId, setIntoViewId] = useState<string>()
  const cateIdPrefix = 'group-'
  const cateClass = 'group-item'

  const onSelectGroup = (id: number) => {
    setActiveGroupId(id)
    setIntoViewId(`${cateIdPrefix}${id}`)
  }

  const { run: onScroll } = useThrottleFn(
    () => {
      const query = Taro.createSelectorQuery()
      query
        .selectAll(`.${cateClass}`)
        .boundingClientRect((res) => {
          if (Array.isArray(res)) {
            const matched = res.find((v) => v.top > 0 && v.top < 0.5 * windowInfo.screenHeight)
            if (matched) {
              const id = Number(matched.id.replace(cateIdPrefix, ''))
              setActiveGroupId(id)
            }
          }
        })
        .exec()
    },
    { wait: 500 },
  )

  return (
    <>
      <div className='h-40'>
        <Image
          src='https://c-ssl.duitang.com/uploads/blog/202202/07/20220207222516_d1ba3.jpg'
          className='h-full w-full'
          mode='aspectFill'
        />
      </div>

      <section className='ui-shadow relative z-10 mx-6 -mt-10 mb-6 flex gap-4 rounded-md bg-white p-4'>
        <article className='flex-1 space-y-2 truncate'>
          <h2 className='font-bold'>我的小店</h2>
          <p className='truncate text-xs text-gray-500'>健康食品，食出健康！我们用心做，你吃得更健康！</p>
          <div className='flex gap-2'>
            <CouponItem />
            <CouponItem />
            <CouponItem />
          </div>
          <p className='truncate text-xs text-gray-500'>公告: 本店满40元起送, 配送费￥6.00, 所有产品现卖现做。</p>
        </article>

        <div className='h-12 w-12 overflow-hidden rounded-md'>
          <Image
            className='h-full w-full'
            src='https://tse1.mm.bing.net/th/id/OIP._AyrCZe9tegn34uhnpOhPAHaJQ?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3'
            mode='aspectFill'
          />
        </div>
      </section>

      <section className='flex'>
        <ScrollView scrollY showScrollbar={false} className='w-1/4 bg-gray-100' style={{ height: scrollHeight }}>
          <aside>
            {groups?.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectGroup(item.id)}
                className={cls(
                  'py-4 text-center text-xs transition-colors',
                  item.id === activeGroupId ? 'bg-white text-amber-300' : '',
                )}
              >
                {item.name}
              </div>
            ))}
          </aside>
        </ScrollView>

        <ScrollView
          scrollY
          showScrollbar={false}
          enhanced
          scrollIntoView={intoViewId}
          className='w-3/4'
          style={{ height: scrollHeight }}
          onScroll={onScroll}
        >
          <main className='pb-px'>
            {groups?.map((g) => (
              <div key={g.id} id={`${cateIdPrefix}${g.id}`} className={cateClass}>
                <h2 className='m-4 text-lg'>{g.name}</h2>

                {g.items.map((v) => (
                  <GoodListItem key={v.id} data={v} className='m-4' />
                ))}
              </div>
            ))}
          </main>
        </ScrollView>
      </section>

      <CartWidget onRect={(r) => setWidgetHeight(r.height)} style={{ bottom: navHeight }} />
      <NavBar onRect={(r) => setNavHeight(r.height)} />
    </>
  )
}
