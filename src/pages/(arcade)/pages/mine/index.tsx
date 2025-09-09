/**
 * @name Mine
 * @description
 * @author darcrand
 */

import BottomBar from '@/pages/(arcade)/components/BottomBar'
import { Image } from '@taroify/core'

import icont1 from 'src/pages/(arcade)/assets/images/icon-tool-01.png'
import icont2 from 'src/pages/(arcade)/assets/images/icon-tool-02.png'
import icont3 from 'src/pages/(arcade)/assets/images/icon-tool-03.png'
import icont4 from 'src/pages/(arcade)/assets/images/icon-tool-04.png'

import IconFont from '@/components/IconFont'
import { useSafeArea } from '@/hooks/useSafeArea'
import iconm1 from 'src/pages/(arcade)/assets/images/icon-menu-1.png'
import iconm2 from 'src/pages/(arcade)/assets/images/icon-menu-2.png'
import iconm3 from 'src/pages/(arcade)/assets/images/icon-menu-3.png'
import iconm4 from 'src/pages/(arcade)/assets/images/icon-menu-4.png'
import iconm5 from 'src/pages/(arcade)/assets/images/icon-menu-5.png'

import './styles.less'

const items = [
  { value: 465, label: '游戏币' },
  { value: 8, label: '赠币' },
  { value: 35, label: '彩票' },
  { value: 2358, label: '积分' },
]

const tools = [
  { name: '资产记录', icon: icont1 },
  { name: '兑换商城', icon: icont2 },
  { name: '领券中心', icon: icont3 },
  { name: '会员权益', icon: icont4 },
]

const menus = [
  { name: '订单管理', icon: iconm1 },
  { name: '套票管理', icon: iconm2 },
  { name: '优惠券', icon: iconm3 },
  { name: '在线客服', icon: iconm4 },
  { name: '设置', icon: iconm5 },
]

export default function Mine() {
  const { top, btnHeight, btnSpacing } = useSafeArea()

  return (
    <>
      <section className='ui-page-bg h-screen'>
        <div style={{ height: top + btnHeight + 2 * btnSpacing }} />

        <section className='m-4 flex items-center gap-2'>
          <div className='ui-bg-linear-b-theme rounded-full p-0.5'>
            <Image
              width='120rpx'
              height='120rpx'
              src='https://pic1.zhimg.com/v2-d5c9885f8f14915ac36944c304d69964_r.jpg'
              shape='circle'
              mode='aspectFit'
            />
          </div>

          <article className='flex-1'>
            <h2 className='text-lg font-bold'>王富贵</h2>
            <p className='text-sm text-gray-500'>成长值666分</p>
          </article>

          <IconFont name='icon-right' className='text-xl text-gray-500' />
        </section>

        <section className='ui-bg-linear-l-theme m-4 rounded-2xl'>
          <div className='flex items-center justify-between p-4'>
            <article>
              <p className='mt-2 flex items-center gap-2'>
                <span className='ui-bg-linear-b-theme flex h-6 w-6 items-center justify-center rounded-full border-2 border-solid border-gray-700'>
                  <IconFont name='icon-credit-level-fill' className='text-lg text-gray-700' />
                </span>

                <span className='text-xl font-bold text-gray-600'>超级VIP</span>
              </p>

              <p className='mt-2 text-sm text-gray-500'>有效期至2090/01/31</p>
            </article>

            <span className='rounded-full bg-gray-800 px-4 py-2 text-green-300'>立即续费</span>
          </div>

          <ol className='grid grid-cols-4 gap-4 rounded-2xl bg-white p-4'>
            {items.map((item) => (
              <li key={item.value} className='text-center'>
                <p className='text-lg font-bold text-gray-800'>{item.value}</p>
                <p className='text-sm text-gray-500'>{item.label}</p>
              </li>
            ))}
          </ol>
        </section>

        <ul className='m-4 grid grid-cols-4 gap-4 rounded-2xl bg-white p-4'>
          {tools.map((item) => (
            <li key={item.name} className='flex flex-col items-center gap-2'>
              <Image src={item.icon} alt={item.name} width={70} height={70} />
              <p className='text-sm text-gray-500'>{item.name}</p>
            </li>
          ))}
        </ul>

        <ul className='m-4 space-y-4 rounded-2xl bg-white p-4'>
          {menus.map((item) => (
            <li key={item.name} className='flex items-center gap-2'>
              <Image src={item.icon} alt={item.name} width={50} height={50} />
              <p className='flex-1 text-sm text-gray-800'>{item.name}</p>
              <IconFont name='icon-right' className='text-xl text-gray-500' />
            </li>
          ))}
        </ul>

        <BottomBar />
      </section>
    </>
  )
}
