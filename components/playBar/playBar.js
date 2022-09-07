const { xComponent, getStoreBindings } = require('wx-jumbo')


xComponent({
  props: {
    playbarHeight: Number,
    item: {
      type: Object,
      default: () => { }
    }
  },

  methods: {
    control() {
      console.log('Do nothing...')
    },
    showPlayOverlay(e) {
      const { currentTarget: { dataset: { type } } } = e
      this.$dispatch('overlay', type)
    },
  }
})