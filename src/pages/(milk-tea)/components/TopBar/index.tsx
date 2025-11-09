import IconFont from '@/components/IconFont'
import { useElementRect } from '@/hooks/useElementRect'
import { useSafeArea } from '@/hooks/useSafeArea'
import Taro from '@tarojs/taro'

export default function TopBar(props: { title?: string }) {
  const { top, btnHeight, btnSpacing } = useSafeArea()
  const elId = 'milk-tea-top-bar'
  const rect = useElementRect(elId)

  return (
    <>
      <section
        id={elId}
        className='fixed top-0 right-0 left-0 z-10 bg-white'
        style={{ paddingTop: top + btnSpacing, paddingBottom: btnSpacing }}
      >
        <header className='flex items-center' style={{ height: btnHeight }}>
          <span className='w-1/4' onClick={() => Taro.navigateBack()}>
            <IconFont name='icon-left' className='ml-2 text-2xl' />
          </span>

          <span className='flex-1 text-center'>{props.title}</span>

          <span className='w-1/4'></span>
        </header>
      </section>

      <div style={{ height: rect.height }}></div>
    </>
  )
}
