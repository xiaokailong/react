import fetch from '@/services/fetch'
import {compilePath} from '@/utils/assist'

export const ajaxFactory = (url, method, data) => {
  const completePath = compilePath(url, data)
  return fetch[method.toLowerCase()](completePath, data)
}

export const resfilter = options => {
  const format = options.format.split('.')
  let index = 0
  return function fn (res) {
    if (format[index]) {
      const _res = res[format[index]]
      index++
      return fn(_res)
    } else {
      index = 0
      return res
    }
  }
}
