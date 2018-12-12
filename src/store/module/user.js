import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    account: 'admin',
    userId: '761b5378-e843-4df3-a7aa-53965311814f',
    avatorImgPath: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4',
    token: 'super_admin',
    access: ['admin', 'super_admin'],
    hasGetInfo: true
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.account = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { account, password }) {
      account = account.trim()
      return new Promise((resolve, reject) => {
        login({
          account,
          password
        }).then(res => {
          const data = res.data
          commit('setToken', data.data.user_id)
          resolve(data.data.user_id)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {


      return new Promise((resolve, reject) => {
        commit('setAvator', '')
        commit('setUserName', '')
        commit('setUserId', '')
        commit('setAccess', '')
        commit('setHasGetInfo', true)
        commit('setToken', '')
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvator', data.avator)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
