const querystring = require('querystring')

const AJAX_TYPE_PENDING = 'pending'
const AJAX_TYPE_RESOLVE = 'resolve'
const AJAX_TYPE_REJECT = 'reject'

// 执行区
const execution = {}
// 等候区
const waiting = {}
/**
 * API节流器
 * @param {object} fetch ajax
 */
const ajaxDebounce = function (fetch) {
  return function ({method = '', url = '', data = {}, options}) {
    const key = `${method}:${url}?${querystring.stringify(data)}`
    if (execution[key] === AJAX_TYPE_PENDING) {
      return new Promise((resolve, reject) => {
        if (waiting[key]) waiting[key].push(resolve)
        else waiting[key] = [resolve]
      })
    }
    execution[key] = AJAX_TYPE_PENDING
    return (
      fetch({
        url,
        method,
        params: ~['get', 'delete'].indexOf(method) ? data : {},
        data: ~['post', 'put', 'patch'].indexOf(method) ? data : {},
        ...options
      })
        .then(res => {
          execution[key] = AJAX_TYPE_RESOLVE
          waiting[key] && call(waiting[key], res)
          clearWaiting(key)
          return res
        })
        .catch(error => {
          execution[key] = AJAX_TYPE_REJECT
          clearWaiting(key)
          if (fetch.isCancel(error)) {
          } else {
            // 处理错误
            throw new Error(error)
          }
        })
    )
  }
}

function call (queue, params) {
  queue.forEach(resolve => {
    resolve(JSON.parse(JSON.stringify(params)))
  })
}

function clearWaiting (key) {
  delete waiting[key]
}

export default ajaxDebounce
