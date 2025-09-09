/**
 * @name IconFont
 * @description 自定义图标
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { Text, type TextProps } from '@tarojs/components'

export default function IconFont(props: TextProps & { name: string }) {
  const { className, name, ...restProps } = props

  // return <Icon classPrefix='iconfont' name={name} className={cls(name, className)} {...restProps} />

  return <Text className={cls('iconfont text-base', name, className)} {...restProps} />
}
