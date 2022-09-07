const { globalData: { listener, adjustment } } = getApp()
/**
 * 添加事件监听的behavior
 */
export const addListener = Behavior({
  created() {
    this.$addEventListener(listener.TOAST, ({ target: {
      type = "loading",
      message = "加载中...",
      position = 'middle',
      mask = false,
      forbidClick = false,
      loadingType = "spinner",
      zIndex = 1000,
      duration = 2000,
      onClose = () => { }
    } } = { target: {} }) => {
      Toast({
        type,
        position,
        message,
        mask,
        forbidClick,
        loadingType,
        zIndex,
        duration,
        onClose
      })
    })
    this.$addEventListener(listener.OVERLAY, (e) => {
      this.onOverlayShow(e)
    })
  },
  detached() {
    this.$removeEventListener(listener.TOAST)
    this.$removeEventListener(listener.OVERLAY)
  }
})


/**
 * 添加遮罩层操作（动画，点击）
 */
export const overlayAction = Behavior({
  data: {
    factor: 0.62,
    aniwrapperHeight: 0,  // "正在播放"的高度
    current: 1, // 当前"正在播放"的swiper
    isPlayListOverlayShow: false, // "正在播放"遮罩是否展示
    isPlayNowOverlayShow: false, // 当前歌曲页面
    playListTitleStatusHeight: 0,
    playbarHeight: 0,
    playtabTransY: 0
  },
  created() {
    this.initAniWrapperHeight()
  },
  methods: {
    // 初始化原始的高度信息
    initAniWrapperHeight() {
      wx.nextTick(() => {
        const screenHeight = this.$getItem('systemInfo').screenHeight
        this.$set({
          aniwrapperHeight: this.data.factor * screenHeight
        })
      })
    },
    // 弹出播放列表
    async onOverlayShow(e) {
      const type = e.currentTarget ? e.currentTarget.dataset.type : e.target
      this.$setNavBarColor()
      if (type === 'playlist') {
        await this.$set({
          isPlayListOverlayShow: true,
        })
        const [res1, res2] = await Promise.all([this.$getRect('.play-title'), this.$getRect('.play-status')])
        await this.$set({
          playListTitleStatusHeight: res1.height + res2.height
        })
      } else if (type === 'playnow') {
        if (this.data.playbarHeight > 0) {
          await this.$set({
            isPlayNowOverlayShow: true
          })
          this.playAndTabMina(0, 2 * this.data.tabbarHeight - adjustment)
        } else {
          this.setPlaybarHeight(this.data.tabbarHeight - adjustment)
          wx.nextTick(() => {
            this.$set({
              isPlayNowOverlayShow: true
            }).then(() => {
              this.playAndTabMina(0, 2 * this.data.tabbarHeight - adjustment)
            })
          })
        }

      }
    },

    // 关闭播放列表
    onOverlayClick(e) {
      if (e.detail === 'playlist') {
        this.$set({
          isPlayListOverlayShow: false,
        })
      } else {
        this.$set({
          isPlayNowOverlayShow: false,
        }).then(() => {
          this.playAndTabMina(2 * this.data.tabbarHeight - adjustment, 0)
        })
      }
      this.$setNavBarColor('#000000')
    },

    playAndTabMina(transBefore, transAfter) {
      this.animate('.bottom-container', [
        { translateY: transBefore },
        { translateY: transAfter },
      ], 160, function () {
        this.$set({
          playtabTransY: transAfter
        })
        this.clearAnimation('.bottom-container')
      }.bind(this))
    },
  },
})


/**
 * 下拉刷新加载更多
 */
export const pulldownRefresh = Behavior({
  data: {
    list: [],
    page: 1,
    pageSize: 10,
    isRequesting: false, // 是否正在请求数据，防止数据的重复加载
    hasMore: true, // 是否还有更多数据
    isEmpty: false, // 是否为空数据
  },
  ready() {
    /**获取需要操作的组件 */
    this._scrollRefresh = this.selectComponent('#refresh')
  },
  methods: {
    refresh() {
      if (!this.data.isRequesting) {
        this.$set({
          page: 1,
          isRequesting: true,
          hasMore: true,
          isEmpty: false
        });
        this.getData();
      }
    },
    loadMore() {
      if (this.data.hasMore && !this.data.isRequesting) {
        this.$set({
          page: this.data.page + 1,
          isRequesting: true
        });
        this.getData();
      }
    },
    getData() {
      setTimeout(() => {
        if (this.data.page === 1) {
          // 刷新数据
          this.$set({
            list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            isRequesting: false
          });
        } else {
          // 上拉加载数据
          this.$set({
            list: this.data.list.concat(10),
            isRequesting: false,
            hasMore: false
          });
        }
        this._scrollRefresh.setRefresh(false);
      }, 3000);
    }
  }
})


/**
 * 小程序登录
 */
export const loginPart = Behavior({
  created() {
    wx.checkSession({
      complete: res => {
        wx.login({
          success: res => {
            this._wxcode = res.code
          }
        })
      },
    })
  }
})

/**
 * 页面结构
 */
export const structurePage = Behavior({
  data: {
    pageTitle: 'Laura', // navbar的标题
    active: 0, // 当前tabbar下标
    rate: 0,  // navbar透明度百分比
  },
  methods: {
    onTabBarChange(e) {
      this.$set({
        active: e.detail
      })
    },
  }
})