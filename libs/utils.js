const { inject, yoyo: { getTypeOfValue } } = require('wx-jumbo')

const jumpTo = (urlLink, comObject) => {
  let str = ''
  if (comObject && getTypeOfValue(comObject) === 'object') {
    Object.keys(comObject).forEach((key, i, arr) => {
      if (i < arr.length - 1) {
        str += `${key}=${comObject[key]}&`
      } else {
        str += `${key}=${comObject[key]}`
      }
    })
  }
  console.log('跳转地址===>', urlLink + '?' + str)
  return wx.navigateTo({
    url: urlLink + '?' + str
  })
}

const setNavBarColor = (frontColor = '#ffffff', backgroundColor = '#00ff00') =>
  wx.setNavigationBarColor({
    frontColor,
    backgroundColor
  })

const rpx2px = (rpx) => rpx / 750 * wx.getSystemInfoSync().windowWidth

const goBack = () => wx.navigateBack()

module.exports = function () {
  inject('jumpTo', jumpTo)
  inject('setNavBarColor', setNavBarColor)
  inject('rpx2px', rpx2px)
  inject('goBack', goBack)
}