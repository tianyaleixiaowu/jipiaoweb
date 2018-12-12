import axios from '@/libs/api.request'

export const login = ({ account, password }) => {
  const data = {
    account,
    password
  }
  return axios.request({
    url: `/api/user/login?account=${data.account}&password=${data.password}`,
    // data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
