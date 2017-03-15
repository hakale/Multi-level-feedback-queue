import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import modules from './modules'

Vue.use(Vuex)

/* var state = {
  insSeq: null,
  pageSeq: null,
  sizeOfMem: 4,
  FIFO: null,
  LRU: null,
  LFU: null,
  Optimal: null
} */

export default new Vuex.Store({
  actions,
  getters,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
