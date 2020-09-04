import {isObject, compilePath} from '@/utils/assist'
import fetch from './fetch'
// import {compilePath} from '@/utils/assist'
const methods = ['get', 'post', 'delete', 'put', 'patch', 'head']
class ORM {
  constructor () {
    this.module = {}
    this.plugins = []
    if (new.target !== undefined) {
      methods.forEach(method => { this[method] = this._ajax(method)() })
    } else {
      throw new Error('必须使用 new 命令生成实例')
    }
  }
  // 插件装载
  use (plugins) {
    this.plugins.push(plugins)
    this.plugins.forEach(plugin => {
      const apply = plugin.apply
      apply.call(plugin, this)
    })
  }

  next (module) {
    const self = this
    let index = 0
    return async function next () {
      if (index >= module.middlewares.length) { return }
      let middleware = module.middlewares[index]
      index++
      await middleware(module, next.bind(self))
    }
  }

  _ajax (method) {
    return () => (config, ...middlewares) => {
      const source = fetch.createCancelTokenSource()
      config = isObject(config) ? config : {
        url: config
      }
      let {url} = config
      const key = Symbol(url)
      this.module[key] = this.module[key] || {
        middlewares: middlewares || [],
        req: {
          body: {}
        },
        res: {}
      }
      const module = this.module[key]
      const self = this
      async function fn (params) {
        const _url = compilePath(url, params)
        module.req.body = params
        module.res = await fetch[method](_url, params, {
          cancelToken: source.token
        })
        await self.next(module)()
        return module.res
      }
      fn.source = source
      return fn
    }
  }
}

export default ORM
