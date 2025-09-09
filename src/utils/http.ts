import axios from 'axios-miniprogram'
import QueryString from 'qs'

export const http = axios.create({
  timeout: 10000,
  paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'brackets' }),
})

http.interceptors.request.use((config) => {
  return config
})
