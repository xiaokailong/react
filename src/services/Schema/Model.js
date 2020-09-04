import {
  isUndefined,
  isArray,
  isObject,
  isString,
  deepClone
} from '@/utils/assist'
import { ajaxFactory, resfilter } from './units'

import EventBus from '@/services/EventBus'

/**
 * 验证Model实例初始化中params中的key不允许以_开头
 * _开头的对象为私有对象，外部不允许定义
 * @param {String} key 需验证的key
 * @returns {Boolean}
 * @example
 * // return true
 * checkParamsKey('_keyName')
 * // return false
 * checkParamsKey('keyName')
 */
export function checkParamsKey (key) {
  return !/^_/.test(key)
}

const _defaults = {
  key: 'id',
  url: '',
  defaults: {},
  methods: {},
  resFormat: 'data.data',
  showError: true,
  parse: data => data
}

class Model {
  constructor ({
    key = _defaults.key,
    url = _defaults.url,
    defaults = _defaults.defaults,
    parse = _defaults.parse,
    resFormat = _defaults.resFormat,
    methods = _defaults.methods,
    showError = _defaults.showError
  } = _defaults) {
    this.key = key
    this.url = url
    this.defaults = defaults
    this.parse = parse
    // extend functions
    Object.keys(methods).forEach(item => {
      this[item] = methods[item]
    })
    this._ajax = this.url ? ajaxFactory.bind(null, this.url) : null
    this._data = defaults
    this.resFormat = resFormat
    this.showError = showError
    this.resfilter = resfilter({format: this.resFormat})
  }
  /**
   * es6 class extends 语法糖
   * @param {Object} initParams model的初始化参数
   * @param {String} initParams.url ajax请求的url
   * @param {Object} initParams.defaults 默认值
   * @param {Function} initParams.parse 数据解析器
   */
  static extend (initParams) {
    return class extends Model {
      constructor (params) {
        super(initParams)
        if (!params) params = this.defaults
        this._data = deepClone(params)
        const methods = ['post', 'patch', 'put', 'delete']
        methods.forEach(method => this.ajaxCreator(method))
      }
    }
  }
  ajaxCreator (method) {
    this[method] = async () => {
      try {
        const res = await this._ajax(method.toUpperCase(), this._data)
        if (this.showError && res.data.flg === 0) {
          const errorMsg = res.data.msg || '错误'
          throw new Error(errorMsg)
        }
        return this.resfilter(res)
      } catch (error) {
        if (this.showError) EventBus.emit('error', error)
        throw new Error(error)
      }
    }
  }
  /**
   * 获取model中的值或对象
   * @param {String=} param 查询的key
   * @example
   * // return {key1: 'val1', key2: 'val2'}
   * example.get()

   * // return 'val1'
   * example.get('key1')
   *
   * // throw error
   * example.get({key1: 'val1', key2: 'val2'})
   */
  get (param = '') {
    // 如果 param 未传入或传入的值为空时候，返回全部数据
    if (!param) return this._data
    // 如果 param为String返回查询后的结果
    if (isString(param)) {
      return isUndefined(this._data[param]) ? '' : this._data[param]
    }
    if (isArray(param)) {
      return Object.assign.apply(
        param.map(item => ({
          item: isUndefined(this._data[item]) ? '' : this._data[item]
        }))
      )
    }
    throw new Error('get方法参数类型错误: get(param: [Null | String | Array])')
  }

  /**
   * set model
   * @param {String | Object}
   * @return Model Object
   * @example
   * // {key1: 'val1', key2: 'val2'} => {key1: 'val3', key2: 'val2'}
   * example.set('key1', 'val3')
   * // or
   * example.set({key1: 'val3'})
   */
  set (key, val) {
    if (arguments.length === 0) {
      throw new Error(
        'set方法参数错误：set(param:[Object]) | set(key:[ String ], val: [String])'
      )
    }
    this._data = this.parse(
      isObject(key)
        ? deepClone(key)
        : isString(key) ? { ...this._data, ...{ [key]: deepClone(val) } } : {}
    )
    return this
  }

  /**
   * 根据key 删除model子项
   * @param {String} key 要删除子项中的key
   * @returns Model Object
   * @example
   * // {key1: 'val1', key2: 'val2'} => {key2: 'val2'}
   * example.unset('key1')
   */
  unset (key) {
    delete this._data[key]
    return this
  }

  _getKey () {
    return this.key
  }

  _hasKeyData () {
    return !!this._data[this._getKey()]
  }
  /**
   * ajax请求：保存数据
   */
  save () {
    const method = this._hasKeyData() ? 'PUT' : 'POST'
    return this._ajax(method, this._data)
  }

  /**
   * fetch 数据
   * @param {Object} param
   * @param {Object} param.where fetch条件
   */
  async fetch ({ where = {} } = { where: {} }) {
    try {
      const res = await await this._ajax('GET', where)
      if (this.showError && res.data.flg === 0) {
        const errorMsg = res.data.msg || '错误'
        throw new Error(errorMsg)
      }
      const data = this.resfilter(res)
      this.set(data).get()
    } catch (error) {
      if (this.showError) EventBus.emit('error', error)
      throw new Error(error)
    }
  }
}

export default Model
