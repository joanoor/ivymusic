const startInject = require('./libs/apis/index')
const startInstall = require('./libs/utils')
startInject() // 全局注入接口
startInstall() // 全局注入utils方法

App({
  onLaunch() {
    try {
      const res = wx.getSystemInfoSync()
      console.log(res)
      wx.setStorage({
        key: 'systemInfo',
        data: res
      })
    } catch (e) {
      // Do something when catch error
      console.log('oh...... 出错了', e)
    }
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  onShow() { },
  globalData: {
    userInfo: null,
    adjustment: 5,  // 底部playbar的高度等于 tabbar高度减去ADJUSTMENT
    listener: {  // 监听的事件列表
      'TOAST': 'toast',
      'OVERLAY': 'overlay',
    },
    tarbarList: [{
      text: "音乐",
      iconfont: 'yinle',
    },
    {
      text: "我的",
      iconfont: 'wode'
    }],
    pageStyle: `
    --main-color: rgb(255, 26, 23);
    --main-color-light: rgb(255, 255, 255);
    --main-color-dark: rgb(51, 51, 51);
    --main-color-grayer: rgb(100, 100, 100);
    --main-color-gray: rgb(179, 179, 179);
    --main-color-orange: rgb(237, 172, 26);
    --main-bgcolor: rgb(240, 240, 240);
    --main-overlay-background: rgba(0, 0, 0, 0.44);
    `
  }
})