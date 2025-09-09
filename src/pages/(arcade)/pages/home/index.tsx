/**
 * @name Home
 * @description
 * @author darcrand
 */

import IconFont from '@/components/IconFont'
import { useElementRect } from '@/hooks/useElementRect'
import { useSafeArea } from '@/hooks/useSafeArea'
import BottomBar from '@/pages/(arcade)/components/BottomBar'
import { cls } from '@/utils/cls'
import { Image } from '@taroify/core'
import { usePageScroll } from '@tarojs/taro'
import { useThrottleFn } from 'ahooks'
import { useMemo, useState } from 'react'

import imgHomeBanner from 'src/pages/(arcade)/assets/images/home-banner.jpg'
import iconCoin2 from 'src/pages/(arcade)/assets/images/icon-coin-02.png'
import iconCoin from 'src/pages/(arcade)/assets/images/icon-coin.png'
import iconLottery from 'src/pages/(arcade)/assets/images/icon-lottery.png'
import imgb1 from 'src/pages/(arcade)/assets/images/img-block-1.png'
import imgb2 from 'src/pages/(arcade)/assets/images/img-block-2.png'
import imgb3 from 'src/pages/(arcade)/assets/images/img-block-3.png'
import imgTabBg from 'src/pages/(arcade)/assets/images/img-tab-bg.png'
import './styles.less'

const types = [
  { value: '1', name: '游戏币', icon: iconCoin2 },
  { value: '2', name: '套票', icon: iconLottery },
]

// 游戏币
const gameCoins = Array(10)
  .fill(0)
  .map(() => ({ id: Math.random().toString(), title: '1000限时币', desc: '有效期360天', price: 199 }))

// 抽奖
const lotteries = Array(10)
  .fill(0)
  .map(() => ({ id: Math.random().toString(), title: '500币+20彩票', desc: '有效期360天', price: 299 }))

export default function Home() {
  const { top, btnLineWidth, btnHeight, btnSpacing } = useSafeArea()
  const headerRect = useElementRect('header')
  const [showHeaderBg, setShowHeaderBg] = useState(false)
  const { run } = useThrottleFn((scrollTop: number) => setShowHeaderBg(scrollTop > headerRect.height), { wait: 500 })
  usePageScroll((e) => run(e.scrollTop))

  const [currentType, setCurrentType] = useState(types[0].value)

  const list = useMemo(() => {
    if (currentType === '1') {
      return gameCoins
    }
    if (currentType === '2') {
      return lotteries
    }
    return []
  }, [currentType])

  return (
    <>
      <header
        id='header'
        className={cls(
          'fixed top-0 right-0 left-0 z-50 duration-500',
          showHeaderBg ? 'bg-emerald-300' : 'bg-transparent',
        )}
        style={{ paddingTop: top }}
      >
        <section
          style={{ width: btnLineWidth, height: btnHeight, paddingTop: btnSpacing, paddingBottom: btnSpacing }}
          className='flex items-center gap-1'
        >
          <IconFont name='icon-location' className='ml-4' />
          <span className='truncate text-xs'>广州迎宾北路时代广场店</span>
          <IconFont name='icon-right' />

          <span
            className='mr-4 ml-auto flex items-center justify-center rounded-full bg-white/75'
            style={{ width: btnHeight, height: btnHeight }}
          >
            <IconFont name='icon-scan' />
          </span>
        </section>
      </header>

      <section className='relative min-h-screen bg-gray-50'>
        <div className='absolute top-0 right-0 left-0'>
          <Image width='100vw' height='75vw' src={imgHomeBanner} mode='aspectFit' />
          <i className='ui-banner-cover absolute top-0 right-0 left-0' style={{ width: '100vw', height: '75vw' }}></i>
        </div>

        <div style={{ height: headerRect.height }}></div>

        <div className='relative z-10 mx-2 -mb-12' style={{ height: '48vw' }}></div>

        <div className='ui-shadow-md relative z-20 mx-4 rounded-3xl bg-white p-4'>
          <article className='flex items-center gap-2'>
            <div className='ui-bg-linear-b-theme rounded-full p-0.5'>
              <Image
                width='120rpx'
                height='120rpx'
                src='https://pic1.zhimg.com/v2-d5c9885f8f14915ac36944c304d69964_r.jpg'
                shape='circle'
                mode='aspectFit'
              />
            </div>

            <div>
              <p className='text-lg font-bold'>王富贵</p>
              <p className='mt-2 flex items-center'>
                <span className='ui-bg-linear-b-theme flex h-6 w-6 items-center justify-center rounded-full border-2 border-solid border-gray-700'>
                  <IconFont name='icon-credit-level-fill' className='text-lg text-gray-700' />
                </span>

                <span className='ui-bg-linear-opacity-to-theme flex h-6 items-center rounded-r-full px-2 text-xs text-gray-600'>
                  超级VIP
                </span>
              </p>
            </div>

            <div className='ui-bg-linear-l-theme ml-auto flex items-center gap-2 rounded-2xl px-4 py-3'>
              <Image width='50rpx' height='50rpx' src={iconCoin} />
              <span className='font-bold text-gray-800'>立即提币</span>
            </div>
          </article>

          <ol className='mt-8 grid grid-cols-3 gap-4'>
            <li className='text-center'>
              <p className='ui-font-iconoplastic text-2xl font-bold text-gray-800'>1256</p>
              <p className='text-gray-500'>游戏币</p>
            </li>
            <li className='text-center'>
              <p className='ui-font-iconoplastic text-2xl font-bold text-gray-800'>56</p>
              <p className='text-gray-500'>彩票</p>
            </li>
            <li className='text-center'>
              <p className='ui-font-iconoplastic text-2xl font-bold text-gray-800'>145</p>
              <p className='text-gray-500'>积分</p>
            </li>
          </ol>
        </div>

        <div className='m-4 flex items-stretch'>
          <div className='relative w-1/2'>
            <Image width='100%' height='38vw' src={imgb1} mode='scaleToFill' />
            <div className='absolute top-4 left-4'>
              <h3 className='font-bold text-white'>礼品商城</h3>
              <p className='text-xs text-gray-200'>彩票兑换</p>
            </div>

            <p className='absolute top-4 right-2 rounded-full bg-white px-2 py-1 text-xs text-violet-500'>
              已兑换288人
            </p>

            <p className='absolute bottom-4 left-4 rounded-full bg-black/25 px-2 py-1 text-xs text-white italic'>
              乐高已上线
            </p>
          </div>

          <div className='flex w-1/2 flex-col items-end justify-between'>
            <section className='relative w-full'>
              <Image width='100%' height='18vw' src={imgb2} />
              <div className='absolute top-4 left-8'>
                <h3 className='font-bold text-gray-800'>优惠券</h3>
                <p className='text-sm text-gray-700'>折扣享不停</p>
              </div>
            </section>
            <section className='relative w-full'>
              <Image width='100%' height='18vw' src={imgb3} />
              <div className='absolute top-4 left-8'>
                <h3 className='font-bold text-gray-800'>签到有礼</h3>
                <p className='text-sm text-gray-700'>好礼连连</p>
              </div>
            </section>
          </div>
        </div>

        <div className='relative z-20 m-4'>
          <header className='relative'>
            <Image
              width='100%'
              height='150rpx'
              src={imgTabBg}
              mode='scaleToFill'
              style={{ transform: `scaleX(${currentType === '1' ? '-1' : '1'})` }}
            />
            <ul
              className='absolute right-0 left-0 flex items-center'
              style={{ top: '75rpx', transform: 'translateY(-50%)' }}
            >
              {types.map((v) => (
                <li key={v.value} className='flex flex-1 justify-center' onClick={() => setCurrentType(v.value)}>
                  <span
                    className={cls(
                      'relative text-xl font-bold transition-all',
                      v.value === currentType ? 'text-gray-800' : 'text-gray-500',
                    )}
                  >
                    <i
                      className={cls(
                        'absolute right-0 bottom-0 left-0 h-2 bg-emerald-300 transition-all',
                        v.value === currentType ? 'visible opacity-100' : 'invisible opacity-0',
                      )}
                    ></i>
                    <span className='relative'>{v.name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </header>

          <ol className='space-y-4 rounded-b-2xl bg-white py-4'>
            {list.map((v) => (
              <li
                key={v.id}
                className='mx-4 flex items-center gap-4 rounded-2xl border border-solid border-gray-300 p-4'
              >
                <Image width='80rpx' height='80rpx' src={currentType === '1' ? iconCoin2 : iconLottery} />
                <article>
                  <p className='text-lg font-bold'>{v.title}</p>
                  <p className='text-gray-500'>{v.desc}</p>
                </article>

                <p className='ml-auto flex items-baseline rounded-full bg-gray-800 px-4 py-1 text-white'>
                  <span>¥</span>
                  <span className='text-lg'>{v.price}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>

        <BottomBar />
      </section>
    </>
  )
}
