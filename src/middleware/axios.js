import axios from 'axios'
import storage from '@/services/Storage'

// 创建axios实例
const fetch = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL, // api的base_url
  timeout: process.env.REACT_APP_AJAX_TIMEOUT // 请求超时时间
})

// request拦截器
fetch.interceptors.request.use(
  config => {
    const token = storage.session.get('token')
    token && (config.headers.token = token)
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// respone拦截器
fetch.interceptors.response.use(
  response => {
    return response
  },
  error => {
    process.env.NODE_ENV !== 'production' && console.log(error) // for debug
    return Promise.reject(error)
  }
)

fetch.CancelToken = axios.CancelToken
fetch.isCancel = axios.isCancel
export default fetch
