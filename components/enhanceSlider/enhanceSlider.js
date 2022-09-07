const { xComponent } = require('wx-jumbo')

xComponent({
  data: {
    startX: 0,
    width: 0
  },
  async mounted() {
    const res = await this.$getRect('.enhance-slider', true)
    console.log('========', res)
    this.$set({
      startX: res.left,
      width: res.width
    })
  },
  methods: {
    setBrightness(e) {
      wx.setScreenBrightness({
        value: e,
      })
    }
  }
})