export default {
  state: {
    curtime: '',
    curId: '',
    rowId: '',
    type: '',
    text: '',
    url: '',
    state: '',
    component: ''
  },
  getters: {
  },
  mutations: {
    modalStatus (state, param) {
      state.curtime = param.curtime
      state.type = param.type
      state.text = param.text
      state.url = param.url
      state.status = param.status
      state.state = param.state
      state.component = param.component
      state.curId = param.curId
      state.rowId = param.rowId
    }
  },
  actions: {
  }
}
