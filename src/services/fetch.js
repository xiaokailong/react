import axios from '@/middleware/axios'
import debounce from './ajaxDebounce'
let CancelToken = axios.CancelToken
const debounceApi = debounce(axios)

function createCancelTokenSource (params) {
  return CancelToken.source()
}

const fetch = {
  versions: '1.1.0',
  get: (url, data, options) => debounceApi({method: 'get', url, data, options}),
  post: (url, data, options) => debounceApi({method: 'post', url, data, options}),
  put: (url, data, options) => debounceApi({method: 'put', url, data, options}),
  patch: (url, data, options) => debounceApi({method: 'patch', url, data, options}),
  delete: (url, data, options) => debounceApi({method: 'delete', url, data, options}),
  createCancelTokenSource
}

export default fetch
