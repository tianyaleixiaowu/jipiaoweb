export default {
  state: {
    curtime: '',
    searchData: {},
    searchUrl: '',
    curUrl: '',
    page: 0,
    // needSearch: false
  },
  getters: {
    // searchData(){
    //   return
    // }
  },
  mutations: {
    setSearchData (state, param) {
      state.curtime = param.curtime
      state.searchData = param.searchData
      state.searchUrl = param.searchUrl
    },
    refreshTable (state, param) {
      state.curtime = param.curtime
    },
    setPgae (state, page) {
      state.page = page
    },
    setCurUrl (state, curUrl) {
      state.curUrl = curUrl
    }
    // setNeedSearch (state, curUrl) {
    //   state.curUrl = curUrl
    // }
  },
  actions: {
    // setSearchData(state, param) {
    //   state.searchData = param.searchData
    //   state.searchUrl = param.searchUrl
    // }
  //   addErrorLog({ commit, rootState }, info) {
  //     if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
  //     const { user: { token, userId, account } } = rootState
  //     let data = {
  //       ...info,
  //       time: Date.parse(new Date()),
  //       token,
  //       userId,
  //       account
  //     }
  //   }
  }
}
