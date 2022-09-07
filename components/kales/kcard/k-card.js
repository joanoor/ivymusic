const { xComponent } = require('wx-jumbo')
xComponent({
  props: {
    lists: Array,
    sheight: {
      type: String,
      value: '100%'
    },
    mr: String,
    flag: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onClickSong(e) {
      const { currentTarget: { dataset: { item } } } = e
      this.$emit('tapsong', item)
    }
  }
})