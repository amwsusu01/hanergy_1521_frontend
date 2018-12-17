import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common
  },
  getters,
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
})

export default store
