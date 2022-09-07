const { createMobxStore } = require('wx-jumbo')
const { globalData: { tarbarList, pageStyle } } = getApp()
const { yoyo: { setItem, getItem } } = require('wx-jumbo')

export const store = new createMobxStore({
  state: {
    screenWidth: 0,
    screenHeight: 0,
    navbarHeight: 0,
    tabbarHeight: 0,
    playbarHeight: 0,
    tarbarList,
    pageStyle: getItem('pageStyle') || pageStyle
  },
  actions: {
    setScreen(width, height) {
      this.screenWidth = width
      this.screenHeight = height
    },
    setNavbarHeight(height) {
      this.navbarHeight = height
    },
    setTabbarHeight(height) {
      this.tabbarHeight = height
    },
    setPlaybarHeight(height) {
      this.playbarHeight = height
    },
    setPageStyle(str) {
      setItem('pageStyle', str)
      this.pageStyle = str
    }
  }
})