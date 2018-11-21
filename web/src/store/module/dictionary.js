import { getDictionary, getCountry } from '../../api/data'
export default {
  state: {
    dictionaryList: {},
    country: []
  },
  getters: {
    getterGroup: (state, cur_group) => (cur_group) => {
      let data = []
      state.dictionaryList.map(item => {
        if (item.groupId === cur_group) {
          data.push(item)
        }
      })
      return data
    },
    getterCountry: (state) => () => {
      return state.country
    }
  },
  mutations: {
    setDictionary (state, param) {
      state.dictionaryList = param
    },
    setCountry (state, param) {
      state.country = param
    }
  },
  actions: {
    setDictionary ({ commit }, user_id) {
      getDictionary(user_id).then(res => {
        commit('setDictionary', res.data.data)
      })
      getCountry(user_id).then(res => {
        commit('setCountry', res.data.data)
      })
    }
  }
}
