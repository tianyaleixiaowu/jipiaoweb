import axios from '@/libs/api.request'

export const getTableData = (url, token) => {
  return axios.request({
    url: url,
    headers: {
      userId: token
    },
    method: 'get'
  })
}

export const getDictionary = (token) => {
  return axios.request({
    url: '/api/dictionary/list',
    headers: {
      userId: token
    },
    method: 'get'
  })
}
export const getCountry = (token) => {
  return axios.request({
    url: '/api/country',
    headers: {
      userId: token
    },
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}
