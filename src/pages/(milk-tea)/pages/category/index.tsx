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
          src='https://pic1.zhimg.com/v2-67c55990da335e4696ed9db1a126ff00_r.jpg?source=1940ef5c'
          className='h-full w-full'
          mode='aspectFill'
        />
      </div>

      <section className='ui-shadow relative z-10 mx-6 -mt-12 mb-6 rounded-md bg-white p-4'>
        <h2 className='text-lg font-bold'>我的小店</h2>
        <p className='text-sm text-gray-500'>满100元减5元</p>
      </section>

      <section className='flex'>
        <ScrollView scrollY showScrollbar={false} className='w-1/4 bg-gray-100' style={{ height: scrollHeight }}>
          <aside>
            {groups?.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectGroup(item.id)}
                className={cls(
                  'py-4 text-center text-sm transition-colors',
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
