import IconFont from '@/components/IconFont'
import { useSafeArea } from '@/hooks/useSafeArea'
import CartWidget from '@/pages/(milk-tea)/components/CartWidget'
import GoodListItem from '@/pages/(milk-tea)/components/GoodListItem'
import NavBar from '@/pages/(milk-tea)/components/NavBar'
import { useCartStatus } from '@/pages/(milk-tea)/stores/cart'
import { cls } from '@/utils/cls'
import { useState } from 'react'

export default function Cart() {
  const [barHeight, setBarHeight] = useState(0)
  const { top, btnHeight, btnSpacing } = useSafeArea()
  const { list, toggleSelected } = useCartStatus()

  return (
    <>
      <section className='min-h-screen bg-gray-100'>
        <div className='bg-white' style={{ height: top + btnHeight + 2 * btnSpacing }}></div>

        {list.length === 0 ? (
          <div className='mt-32 flex items-center justify-center'>
            <p className='text-sm text-gray-500'>暂无商品</p>
          </div>
        ) : (
          <ol className='ui-shadow m-6 flex flex-col gap-4 rounded-md bg-white p-4'>
            {list.map((v) => (
              <li key={v.id} className='flex items-center gap-4'>
                <span
                  className={cls(
                    'flex h-6 w-6 items-center justify-center rounded-md border border-solid',
                    v.selected ? 'border-amber-300 bg-amber-300' : 'border-gray-400',
                  )}
                  onClick={() => toggleSelected(v)}
                >
                  <IconFont
                    name='icon-selected'
                    className={cls('transition-colors', v.selected ? 'text-white' : 'text-transparent')}
                  />
                </span>

                <GoodListItem data={v} className='flex-1' />
              </li>
            ))}
          </ol>
        )}

        <CartWidget style={{ bottom: barHeight }} />
        <NavBar onRect={(r) => setBarHeight(r.height)} />
      </section>
    </>
  )
}
