/**
 * @name VIPCode
 * @description 会员码展示
 * @author darcrand
 */

import IconFont from '@/components/IconFont'
import { useSafeArea } from '@/hooks/useSafeArea'
import { Image } from '@taroify/core'
import Taro from '@tarojs/taro'

import topImg from 'src/pages/(arcade)/assets/images/code-top-bg.png'
import imgQrcode from 'src/pages/(arcade)/assets/images/img-qrcode.png'
import './styles.less'

export default function VIPCode() {
  const { top, btnHeight, btnSpacing } = useSafeArea()
  const avatarSize = 128

  return (
    <>
      <section className='flex h-screen flex-col bg-black/75'>
        <header style={{ paddingTop: top }}>
          <section
            style={{ height: btnHeight, paddingTop: btnSpacing, paddingBottom: btnSpacing }}
            className='flex items-center gap-2'
          >
            <span className='w-1/4 px-4' onClick={() => Taro.navigateBack()}>
              <IconFont name='icon-left' className='text-3xl text-white' />
            </span>

            <span className='w-1/2 text-center text-lg text-white'>会员码</span>

            <span className='w-1/4 px-4'></span>
          </section>
        </header>

        <main className='mx-8 my-auto'>
          <div className='flex justify-center'>
            <Image src={topImg} width='300rpx' height='170rpx' />
          </div>

          <div className='min-h-96 rounded-3xl bg-white'>
            <header
              className='relative z-10 flex flex-col gap-2'
              style={{ transform: `translateY(-${0.5 * avatarSize}rpx)` }}
            >
              <div className='ui-bg-linear-b-theme mx-auto rounded-full p-0.5'>
                <Image
                  width={`${avatarSize}rpx`}
                  height={`${avatarSize}rpx`}
                  src='https://pic1.zhimg.com/v2-d5c9885f8f14915ac36944c304d69964_r.jpg'
                  shape='circle'
                  mode='aspectFit'
                />
              </div>

              <h2 className='text-center text-lg font-bold'>王富贵</h2>
            </header>

            <div className='ui-qrcode-container relative mx-auto flex h-52 w-52 items-center justify-center rounded-3xl'>
              <i className='ui-qrcode-white-vertical'></i>
              <i className='ui-qrcode-white-horizontal'></i>
              <i className='ui-qrcode-divider'></i>

              <section className='h-48 w-48'>
                <Image width='100%' height='100%' src={imgQrcode} mode='aspectFit' />
              </section>
            </div>

            <p className='text-center text-gray-800' style={{ marginTop: `${0.5 * avatarSize}rpx` }}>
              使用时向服务员出示此码
            </p>
            <p className='mt-2 text-center text-xs text-gray-500'>该二维码每 30s 更新一次</p>

            <div className='h-4'></div>
          </div>

          <p className='mt-4 flex justify-center'>
            <span className='rounded-lg bg-green-300 px-12 py-2 text-gray-800' onClick={() => Taro.navigateBack()}>
              关闭
            </span>
          </p>
        </main>
      </section>
    </>
  )
}
