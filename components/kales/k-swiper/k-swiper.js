const { xComponent } = require('wx-jumbo')
xComponent({
  data: { current: 0 },
  props: {
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '100%'
    },
    itemWidth: {
      type: String,
      value: '100%'
    },
    pm: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    nm: {
      type: String,
      optionalTypes: [Number],
      value: 0
    },
    lists: {
      type: Array,
      value: []
    },
    kstyle: {
      type: String,
      value: 'font-size:inherit'
    }
  },
  created() {
    console.log('this___', this)
  },
  methods: {
    onSwiperChange(e) {
      const { detail: { current } } = e
      this.$set({
        current
      })
    },
  }
})