// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const params = event.params || {} // 云函数参数

  const app = new TcbRouter({ event })

  // routes
  // 获取小程序环境变量
  app.router('/api/env', async (ctx) => {
    ctx.body = {
      code: 0,
      success: true,
      msg: 'ok',
      data: { openid: wxContext.OPENID, appid: wxContext.APPID },
    }
  })

  // 测试参数
  app.router('/api/test', async (ctx) => {
    ctx.body = {
      code: 0,
      success: true,
      msg: 'ok',
      data: params,
    }
  })

  return app.serve()
}
