import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import table from './module/table_model'
import modal from './module/modal_status'
import dictionary from './module/dictionary'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    table,
    modal,
    dictionary
  }
})
