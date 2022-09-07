const { xComponent } = require('wx-jumbo')
xComponent({
  data: {},
  props: {
    lists: Array,
    width: {
      type: String,
      value: '100%'
    },
    height: {
      type: String,
      value: '100%'
    },
    mr: String,
  },
  data: {
  },

  methods: {
    initStyleStr(obj) {
      if (obj && JSON.stringify(obj) !== '{}') {
        const sytles = Object.keys(obj)
        let str = ''
        sytles.forEach(v => {
          str += v + `:${obj[v]};`
        })
        return str
      } else {
        return 'font-size:inherit;'
      }
    }
  }
})