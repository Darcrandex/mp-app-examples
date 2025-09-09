import Taro from '@tarojs/taro'

// 协定的云函数名称
export const TCB_ROUTER_FUN_NAME = 'main'

// 协定的云函数参数 key
export const TCB_ROUTER_PARAMS_KEY = 'params'

// tcb-router 云函数调用
export const $cloud = async <T = any>(url: string, params?: Record<string, any>) => {
  const res = await Taro.cloud.callFunction({
    name: TCB_ROUTER_FUN_NAME,
    data: { $url: url, [TCB_ROUTER_PARAMS_KEY]: params },
  })

  return res.result as { code: number; success: boolean; msg: string; data: T }
}
