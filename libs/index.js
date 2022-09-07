import Toast from '@vant/weapp/toast/toast'

module.exports = {
  addToastEvent(e) {
    this.$addEventListener('toast', ({ target: {
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
  },
  addShowOverlayEvent(e) {
    this.$addEventListener('overlay', (e) => {
      this.onOverlayShow(e)
    })
  }
}