import IconFont from '@/components/IconFont'
import { useCartStatus } from '@/pages/(milk-tea)/stores/cart'
import type { Good } from '@/pages/(milk-tea)/types'
import { cls } from '@/utils/cls'
import { Image } from '@taroify/core'
import { useMemo } from 'react'

export default function GoodListItem(props: { data: Good; className?: string }) {
  const { list, updateCount } = useCartStatus()
  const state = useMemo(() => {
    const inCart = list.find((item) => item.id === props.data.id)
    return { ...props.data, count: inCart?.count || 0 }
  }, [list, props.data])

  return (
    <div className={cls('flex items-stretch gap-4', props.className)}>
      <div className='h-16 w-16 overflow-hidden rounded-md bg-gray-100'>
        <Image src={state?.cover} className='h-full w-full' mode='aspectFill' />
      </div>

      <article className='flex flex-1 flex-col justify-between'>
        <p className='truncate'>{state?.name}</p>
        <footer className='flex items-center'>
          <span className='flex-1 text-sm text-amber-300'>¥{state?.price.toFixed(2)}</span>

          {state?.count && state?.count > 0 ? (
            <>
              <i
                className='flex h-6 w-6 items-center justify-center rounded-full bg-amber-300'
                onClick={() => updateCount(props.data, -1)}
              >
                <IconFont name='icon-reduce' className='text-white' />
              </i>

              <span className='w-12 text-center text-sm'>{state?.count}</span>
            </>
          ) : null}

          <i
            className='flex h-6 w-6 items-center justify-center rounded-full bg-amber-300'
            onClick={() => updateCount(props.data, 1)}
          >
            <IconFont name='icon-add' className='text-white' />
          </i>
        </footer>
      </article>
    </div>
  )
}
