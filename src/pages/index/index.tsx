/**
 * @name Index
 * @description
 * @author darcrand
 */

import { Image } from '@taroify/core'
import Taro from '@tarojs/taro'

import img1 from 'src/assets/previews/arcade-preview.png'

const list = [
  {
    cover: img1,
    name: '世纪电玩城',
    desc: '一款线上购游戏币和兑换套票的小程序',
    pagePath: '/pages/(arcade)/pages/home/index',
  },

  {
    cover: img1,
    name: '世纪鸡尾酒',
    desc: '一款线上购鸡尾酒的小程序',
    pagePath: '/pages/(cocktail)/pages/home/index',
  },
]

export default function Index() {
  return (
    <>
      <h1 className='my-4 text-center text-2xl font-bold'>微信小程序项目展示</h1>

      <p className='m-4 indent-8 text-gray-600'>
        本项目将展示多个微信小程序项目，每个项目独立展示 UI 和功能模块，涉及的数据则使用 mock 实现。本项目仅用于展示
        微信小程序的一些常用功能，不会获取或使用用户的个人信息。
      </p>

      <h2 className='m-4 font-bold'>项目列表</h2>
      <p className='m-4 text-gray-600'>提示:进入任意项目后, 若需要返回至项目列表, 需重新打开小程序</p>

      <ol className='m-4 mt-8 space-y-4'>
        {list.map((v) => (
          <li key={v.name} onClick={() => Taro.navigateTo({ url: v.pagePath })}>
            <div className='flex gap-4'>
              <Image
                src={v.cover}
                wrapperClassName='rounded-md bg-gray-100 shrink-0 overflow-hidden ui-shadow'
                mode='widthFix'
                width='220rpx'
                height='220rpx'
              />

              <article>
                <h3 className='text-lg font-bold'>{v.name}</h3>
                <p className='mt-2 text-gray-600'>{v.desc}</p>
              </article>
            </div>
          </li>
        ))}
      </ol>
    </>
  )
}
