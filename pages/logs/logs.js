const { xComponent } = require('wx-jumbo')

xComponent({
  created() {
    console.log('logs页面的this', this)
  },
})