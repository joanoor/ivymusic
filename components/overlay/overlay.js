const { xComponent } = require('wx-jumbo')

xComponent({
  props: {
    screenHeight: Number,
    factor: {
      type: Number,
      value: 1
    },
    show: {
      type: Boolean,
      value: false
    },
    center: {
      type: Boolean,
      value: false
    }
  },
  data: {
    initMinTransY: 0,
    initMaxTransY: 0,
    initTransX: 0,
    aniwrapperHeight: 0,
  },
  created() { },
  watch: {
    show(newValue) {
      if (newValue) {
        this.initAniWrapper()
      }
    }
  },
  methods: {
    async initAniWrapper() {
      await this.$set({
        aniwrapperHeight: this.properties.factor * this.properties.screenHeight,
        initMinTransY: (1 - this.properties.factor) * this.properties.screenHeight,
        initMaxTransY: this.properties.screenHeight, // 设置初始translateY的距离
        initTransX: this.properties.center ? '-50%' : 0
      })
      this.overlayMina(this.data.initMaxTransY, this.data.initMinTransY)
    },
    onCatchTap() {
      console.log('Do nothing...')
    },
    async onOverlayClick() {
      if (this.properties.factor < 1) {
        this.$emit('closeoverlay', 'playlist')
      } else {
        this.$emit('closeoverlay', 'playnow')
      }
      await this.$set({
        initMaxTransY: this.properties.screenHeight
      })
      this.overlayMina(this.data.initMinTransY, this.data.initMaxTransY, true)
      if (!this.properties.center && this.properties.factor === 1) {
        this.$set({
          show: false
        })
      }
    },

    overlayMina(transBefore, transAfter, end = false) {
      this.animate('.ani-wrapper', [
        { translateX: this.properties.center ? '-50%' : 0, translateY: transBefore + 'px' },
        { translateX: this.properties.center ? '-50%' : 0, translateY: transAfter + 'px' }
      ], 80, function () {
        this.$set({
          initMaxTransY: transAfter
        })
        this.clearAnimation('.ani-wrapper')
        if (this.properties.factor === 1 && end) {
          this.$emit('closeoverlay', 'playnow')
        }
      }.bind(this))
    },
  }
})