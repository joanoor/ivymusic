const { xComponent } = require('wx-jumbo')
const { addToastEvent } = require('../../libs/index')

xComponent({
  data: {

  },
  created() {
    // 添加toast监听
    addToastEvent.call(this)
    const { screenHeight, screenWidth } = this.$getItem('systemInfo')
  },
  mounted() { },
  methods: {

  }
})