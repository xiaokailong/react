import { isArray, compilePath } from '@/utils/assist'
import storage from '@/services/Storage'
import querystring from 'querystring'
import { ajaxFactory, resfilter } from './units'

const CACHE_TYPE_NO_CACHE = 'noCache' // 不缓存
const CACHE_TYPE_SESSION = 'session' // 随浏览器session缓存
const CACHE_TYPE_LOCAL = 'local' // 本地缓存

const _defaults = {
  key: 'id',
  url: '',
  cache: CACHE_TYPE_NO_CACHE,
  defaults: [],
  resFormat: 'data.data',
  model: null,
  parse: data => data
}
class Collection {
  constructor ({
    key = _defaults.key,
    url = _defaults.url,
    Model = _defaults.model,
    cache = _defaults.cache,
    parse = _defaults.parse,
    defaults = _defaults.defaults,
    resFormat = _defaults.resFormat
  } = _defaults) {
    this.key = key
    this.url = url
    this.model = Model ? new Model() : null
    this.cache = cache
    this.parse = parse
    this.defaults = defaults
    this._ajax = this.url ? ajaxFactory.bind(null, this.url) : null
    this._data = defaults
    this.resFormat = resFormat
    this.resfilter = resfilter({format: this.resFormat})
  }
  /**
   * es6 class extends 语法糖
   * @param {Object} initParams model的初始化参数
   * @param {String} initParams.url ajax请求的url
   * @param {Object} initParams.model Model原型
   * @param {Function} initParams.parse 数据解析器
   */
  static extend (initParams) {
    return class extends Collection {
      constructor (param = []) {
        super(initParams)
        if (!isArray(param)) throw new Error(`参数类型错误：应为Array`)
        this._data = [...this._data, ...param]
      }
    }
  }
  get key () {
    if (this.model) return this.model.key
    return this.key
  }
  set key (val) {
    return val
  }

  get isPull () {
    return this.cache === CACHE_TYPE_NO_CACHE
  }

  get () {
    return this._data
  }

  set (data, {noParse} = {noParse: false}) {
    this._data = noParse ? data : this._parse(data)
    return this
  }

  _parse (data) {
    if (this.model) return data.map(item => this.model(item))
    return this.parse(data)
  }

  _getCompilePath (where) {
    return compilePath(this.url, where)
  }

  _getCacheKey (where) {
    const query = querystring.stringify(where)
    const path = `${this._getCompilePath(where)}/${getUserAccount()}`
    return query ? `${path}?${query}` : path
  }

  _setStorageToLocal (key) {
    storage.set(key, this.get())
    return this
  }

  _setStorageToSession (key) {
    storage.session.set(key, this.get())
    return this
  }

  _getStorageFromLocal (key) {
    return storage.get(key) || []
  }
  _getStorageFromSession (key) {
    return storage.session.get(key) || []
  }

  _getDataFromCache (cacheKey) {
    switch (this.cache) {
      case CACHE_TYPE_LOCAL:
        return this._getStorageFromLocal(cacheKey)
      case CACHE_TYPE_SESSION:
        return this._getStorageFromSession(cacheKey)
      default:
        return []
    }
  }

  async fetch (
    { where = {}, pull = this.isPull } = {
      where: {},
      pull: this.isPull
    }
  ) {
    const cacheKey = await this._getCacheKey(where)
    if (pull) { // 向API拉取
      const res = await this._ajax('GET', where)
      const data = this.resfilter(res)
      this.set(data)
      if (this.cache === CACHE_TYPE_LOCAL) {
        this._setStorageToLocal(cacheKey)
      } else if (this.cache === CACHE_TYPE_SESSION) {
        this._setStorageToSession(cacheKey)
      }
    } else {
      const cacheData = this._getDataFromCache(cacheKey)
      if (cacheData.length === 0) return this.fetch({ where, pull: true })
      this.set(cacheData, {noParse: true})
    }
    return this.get()
  }

  async post (data) {
    try {
      const res = await this._ajax('POST', data)
      return resfilter(res)
    } catch (error) {
      throw new Error(error)
    }
  }
}
export default Collection
