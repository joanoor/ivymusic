const { globalData: { adjustment } } = getApp()
const { xComponent, getStoreBindings } = require('wx-jumbo')
const { musicList, bannerList, shortcutList, recommends, songLists, personalBlocks, tastes } = require('../../libs/mock')
import { store } from '../../libs/store/index'
import { addListener, overlayAction, pulldownRefresh, structurePage } from '../../libs/mixins/index'


xComponent({
  mixins: [addListener, overlayAction, pulldownRefresh, structurePage],
  data: {
    /**mock数据，接口调通后删除 */
    musicList,
    bannerList,
    shortcutList,
    recommends,
    songLists,
    personalBlocks,
    tastes,
    /**当前页面所需属性 */
    searchHeight: 0,  // 搜索框高度
    homePageTransX: 0,  // 设置首页left页面translateX的距离
    isPersonalScrollTop: true,
    initScrollTop: 0,  // 初始的时候，滚动条滚动的距离
    initPersonalPicHeight: 500,   // 单位rpx
    checked: false
  },
  storeBindings: getStoreBindings(store),
  created() {
    const { screenWidth, screenHeight } = this.$getItem('systemInfo')
    this.setScreen(screenWidth, screenHeight)
    this._persoanlPicHeight = this.$rpx2px(this.data.initPersonalPicHeight)
  },
  mounted() {
    this.getNavTabSearchHeightInfos() // 获取navbar|tabbar|search高度
    this.initOriginalTransX() // 初始偏移
    // setTimeout(() => {
    //   this.$set({
    //     initScrollTop: `${this.data.initPersonalPicHeight}`,
    //     rate: 1
    //   })
    // }, 3000)
  },
  methods: {
    onChangeMainColor(e) {
      const { detail: { color } } = e
      this.$setItem('maincolor', color)
      this.setPageStyle(`
      --main-color: ${color};
      --main-color-light: rgb(255, 255, 255);
      --main-color-dark: rgb(51, 51, 51);
      --main-color-grayer: rgb(100, 100, 100);
      --main-color-gray: rgb(179, 179, 179);
      --main-color-orange: rgb(237, 172, 26);
      --main-bgcolor: rgb(240, 240, 240);
      --main-overlay-background: rgba(0, 0, 0, 0.44);
      `)
    },
    // 初始化页面的homePageTransX
    initOriginalTransX() {
      this.$set({
        homePageTransX: - this.data.screenWidth
      })
    },
    // 获取tabbar、navbar以及搜索框的高度信息
    async getNavTabSearchHeightInfos() {
      const [tabBarRes, navRes, searchRes] = await Promise.all([this.$getRect('.tabbar'), this.$getRect('.nav-right'), this.$getRect('.search-holder')])
      console.log('getNavTabSearchHeightInfos', tabBarRes, navRes, searchRes)
      this.setNavbarHeight(navRes.height)
      this.setTabbarHeight(tabBarRes.height)
      this.$set({
        searchHeight: searchRes.height
      })
    },

    onSearchBarClick() {
      this.$jumpTo(`/pages/base/base`, { comname: 'searchpage', title: '搜索', tttttttt: 'asdf' })
    },

    onSwiperChange(e) {
      this.$set({
        current: e.detail.current
      })
    },

    toggleHomePage(e) {
      debugger
      const [x, y] = [0, - this.data.screenWidth]
      this.homePageMina(...(e === 'left' ? [x, y] : [y, x]))
    },

    homePageMina(transBefore, transAfter) {
      this.animate('.home-container', [
        { translateX: transBefore, ease: 'ease-out' },
        { translateX: transAfter, ease: 'ease-in' }
      ], 450, function () {
        this.$set({
          homePageTransX: transAfter
        })
        this.clearAnimation('.home-container')
      }.bind(this))
    },

    scrollPersonal(e) {
      this.$set({ // 滚动到顶部
        isPersonalScrollTop: e.detail.scrollTop <= 10,
        rate: e.detail.scrollTop / (this._persoanlPicHeight)
      })
    },

    onChangeSwitch(e) {
      const { detail } = e
      console.log('detail', detail)
      this.$set({
        checked: detail
      })
    }

  }
})