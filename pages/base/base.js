/**基地 除首页index之外的所有页面的基页面 */
const { xComponent, getStoreBindings } = require('wx-jumbo')
import { store } from '../../libs/store/index'
import { addListener, structurePage, overlayAction } from '../../libs/mixins/index'

xComponent({
  mixins: [addListener, structurePage, overlayAction],
  props: {
    comname: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    }
  },
  storeBindings: getStoreBindings(store),
  methods: {
    ddd() {
      return {

        hello: function () { }

      }
    }
  },
  destroyed() {

  },
})