import pathToRegexp from 'path-to-regexp'
import moment from 'moment'
import appEnums from '@/enums'
/**
 * 查找父组件
 * @export
 * @param {any} context 上下文
 * @param {any} componentName 查找父组件名称
 * @param {any} componentNames 查找父组件名称集合
 * @returns 查找到的父组件
 */
export function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

/**
 * 查找第一个符合条件的子组件
 * @export
 * @param {any} context 上下文
 * @param {any} componentName 查找的子组件名称
 * @returns 第一个符合条件的子组件
 */
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

/**
 * 查找所有满足条件的子组件
 * @export
 * @param {any} context 上下文
 * @param {any} componentName 查找的子组件名称
 * @returns 所有满足条件的子组件
 */
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

/**
 * 判断参数是否是其中之一
 * @param {String} value 值
 * @param {Array} validList 数组
 * @returns true or false
 * @example
 * import {oneOf} from @/util/assist
 * // return true
 * oneOf('no', ['yes', 'no'])
 * // return false
 * oneOf('hello', ['yes', 'no'])
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * 判断参数的类型是否为function
 * @param {*} valid 参数
 * @returns true or false
 * @example
 * import {isFunction} from @/util/assist
 * // return true
 * const funs = function () {}
 * isFunction(funs)
 * // return false
 * const str = 'str111'
 * isFunction(str)
 */
export function isFunction (valid) {
  return typeof valid === 'function'
}

/**
 * 是否为字符串验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * import {isString} from @/util/assist
 * // return true
 * isString('cys')
 * // return false
 * isString({name: 'cys'})
 */
export function isString (param) {
  return typeof param === 'string'
}

/**
 * 是否为数字验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * import {isNumber} from @/util/assist
 * // return true
 * isString(111)
 * // return false
 * isString('cys')
 */
export function isNumber (param) {
  return typeof param === 'number'
}

/**
 * 是否为undefined验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * import {isUndefined} from @/util/assist
 * // return true
 * isUndefined(undefined)
 * // return false
 * isUndefined({name: 'cys'})
 */
export function isUndefined (param) {
  return typeof param === 'undefined'
}

/**
 * 是否为数组验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * import {isArray} from @/util/assist
 * // return true
 * isArray(['cys'])
 * // return false
 * isArray({name: 'cys'})
 */
export function isArray (param) {
  return Array.isArray(param)
}

/**
 * 是否为对象验证
 * @param {*} param 需验证的参数
 * @returns {Boolean}
 * @example
 * import {isObject} from @/util/assist
 * // return true
 * isObject({name: 'cys'})
 * // return false
 * isObject(['cys'])
 */
export function isObject (param) {
  return Object.prototype.toString.call(param) === '[object Object]'
}

/**
 * 深度克隆
 * @param {*} obj 需要clone的对象
 * @returns 新的对象
 * @example
 * import {deepClone} from @/util/assist
 * const newObject = deepClone(superObject)
 */
export function deepClone (obj) {
  if (isArray(obj)) {
    return obj.map(deepClone)
  } else if (obj && isObject(obj)) {
    let cloned = {}
    let keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      let key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}

/**
 * path路径补全
 * @param {String} path 补全路径
 * @param {Object} params 参数
 * @returns 完整path
 * @example
 * import {compilePath} from @/util/assist
 * //  return '/user/123'
 * compilePath('/user/:id', { id: 123 })
 */
export function compilePath (path, params) {
  try {
    const toPath = pathToRegexp.compile(path)
    return toPath(params)
  } catch (error) {
    return path
  }
}

/**
 * 首字符大写
 * @param {Sring} str 需要转换的字符串
 * @returns 转换后的字符串
 * @example
 * import {firstLetterToUpperCase} from @/util/assist
 * // return 'Cys'
 * firstLetterToUpperCase('cys')
 */
export function firstLetterToUpperCase (str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

/**
 * 计算百分比
 * @param {*} num
 * @param {*} total
 */
export function GetPercent(num, total) {
  num = parseFloat(num)
  total = parseFloat(total)
  if (isNaN(num) || isNaN(total)) {
    return '-'
  }
  return total <= 0 ? '0%' : (Math.round(num / total * 10000) / 100.00 + '%')
}

// -------------分割线
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export function accAdd (arg1, arg2) {
  let r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1减去arg2的精确结果
 **/
export function accSub (arg1, arg2) {
  let r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export function accMul (arg1, arg2) {
  let m = 0
  let s1 = arg1.toString()
  let s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (
    Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  )
}

/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export function accDiv (arg1, arg2) {
  let t1 = 0
  let t2 = 0
  let r1
  let r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return r1 / r2 * Math.pow(10, t2 - t1)
}

/**
 * 计算字符串长度
 * @param str
 * @returns {number}
 */
export function strlen (str) {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len / 2
}

/**
 * 将数值转为金钱
 * @param num
 * @returns {string}
 */
export function toThousands (num, len) {
  return '￥' + fmoney(num, len)
}

/**
 * 格式化金额
 * @param  {[type]} v     [要转换的数字]
 * @param  {[type]} len   [小数点位数,默认2位]
 * @param  {[type]} split [分隔符,默认',']
 * @return {[type]}       [返回转换完的字符串]
 */
export function fmoney (v, len, split = ',') {
  len = Math.abs(+len % 20 || 2)
  v = parseFloat((v + '').replace(/[^\d .-]/g, '')).toFixed(len) + ''
  return v.replace(/\d+/, function (v) {
    let lit = v.length % 3 === 0
    let index = lit ? v.length - 3 : -1
    return v
      .split('')
      .reverse()
      .join('')
      .replace(/\d{3}/g, function (k, l) {
        return k + (l === index && lit ? '' : split)
      })
      .split('')
      .reverse()
      .join('')
  })
}
export function makeStatusField(statusKey, filter, that, statusName) {
  const section = {
    render: (h, params) => {
      const statusVal = params.row[statusName]
      return that.$t(`${statusKey}.${statusVal}`)
    }
  }
  if (filter) section.filters = makeFilters(that.$tl(statusKey))

  return section
}

export function makeFilters(statusList) {
  let filters = []
  statusList.forEach(e => filters.push({value: e.key, label: e.text}))
  console.log('filters', filters)
  return filters
}

/**
 * 奖金额转为大写
 * @param {*} money 当前金额
 */
export function changeMoneyToChinese (money) {
  let cnNums = [
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖'
  ] // 汉字的数字
  let cnIntRadice = ['', '拾', '佰', '仟'] // 基本单位
  let cnIntUnits = ['', '万', '亿', '兆'] // 对应整数部分扩展单位
  let cnDecUnits = ['角', '分', '毫', '厘'] // 对应小数部分单位
  // let cnInteger = "整"; //整数金额时后面跟的字符
  let cnIntLast = '元' // 整型完以后的单位
  let maxNum = 999999999999999.9999 // 最大处理的数字

  let IntegerNum // 金额整数部分
  let DecimalNum // 金额小数部分
  let ChineseStr = '' // 输出的中文金额字符串
  let parts // 分离金额后用的数组，预定义
  if (money === '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    return ''
  }
  if (money === 0) {
    ChineseStr = cnNums[0] + cnIntLast
    return ChineseStr
  }
  money = money.toString() // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money
    DecimalNum = ''
  } else {
    parts = money.split('.')
    IntegerNum = parts[0]
    DecimalNum = parts[1].substr(0, 4)
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0
    let IntLen = IntegerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = IntegerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0]
        }
        zeroCount = 0 // 归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q]
      }
    }
    ChineseStr += cnIntLast
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') {
    // 小数部分
    let decLen = DecimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = DecimalNum.substr(i, 1)
      if (n !== '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (ChineseStr === '') {
    ChineseStr += cnNums[0] + cnIntLast
  }
  return ChineseStr
}

/**
 * 记录设置depot_id
 */
export function getDepotId() {
  let token = sessionStorage.getItem('token')
  let key = token + 'depotId'
  return localStorage.getItem(key)
}
/**
 * 获取depotId
 * @param {*} id
 */
export function setDepotId(id) {
  let token = sessionStorage.getItem('token')
  let key = token + 'depotId'
  return localStorage.setItem(key, id)
}

/**
 * 消息通知
 * @param title 标题
 * @param desc 描述信息
 * @param type 消息提示的 success-info-warning-error
 */
export function notice(_this, title, desc, type = 'success') {
  let message = {
    title: title,
    desc: desc || ''
  }
  switch (type) {
    case 'success':
      _this.$Notice.success(message)
      break
    case 'info':
      _this.$Notice.info(message)
      break
    case 'warning':
      _this.$Notice.warning(message)
      break
    case 'error':
      _this.$Notice.error(message)
      break
    default:
      _this.$Notice.success(message)
      break
  }
}

/**
 * 防抖动节流器
 * @param {Function} func 事件
 * @param {Number} wait 等待时间
 */
export function throttle (func, wait = 1000) {
  let ctx
  let args
  let rtn
  let timeoutID // caching
  let last = 0
  return function throttled () {
    ctx = this
    args = arguments
    var delta = new Date() - last
    if (!timeoutID) {
      if (delta >= wait) call()
      else timeoutID = setTimeout(call, wait - delta)
    }
    return rtn
  }

  function call () {
    timeoutID = 0
    last = +new Date()
    rtn = func.apply(ctx, args)
    ctx = null
    args = null
  }
}
export function isDebug() {
  if (window.debug === true) return true
  return false
}
export function setDebug(enable) {
  // console.log(enable === true ? 'open debug' : 'close debug')
  if (enable) { window.debug = true } else { window.debug = false }
  return `debug is ${enable === true ? 'open' : 'closed'}`
}
/**
 * 比较两个集合
 * @param a 长度较长数组
 * @param b 长度较短数组
 * @returns 数组差
 */
export function arrayDifference(a, b) {
  var clone = a.slice(0)
  for (var i = 0; i < b.length; i++) {
    var temp = b[i]
    for (var j = 0; j < clone.length; j++) {
      if (temp === clone[j]) {
        clone.splice(j, 1)
      }
    }
  }
  return clone
}

/**
 * 日期字符串格式化
 *
 * @export
 * @param {string} [date=''] 需要被格式化的字符串
 * @param {string} [pattern=process.env.REACT_APP_DATE_PATTERN] 格式 详见参考 http://momentjs.cn/
 * @returns 格式化后的日期字符串
 */
export function formatDate(date = '', pattern = process.env.REACT_APP_DATE_PATTERN) {
  if (!date) return ''
  return moment(date).format(pattern)
}

/**
 * 表格列求和
 *
 * @param data 表格数据集
 * @param target 目标列字段名
 * @return 当前列求和后的结果
 */
export function sumColumn(data, target) {
  if (data.length > 0) {
    let arr = []
    for (let i in data[0]) {
      if (i === target) {
        arr = data.map(item => {
          return item[target]
        })
      }
    }
    return arr.reduce(function (x, y) {
      return accAdd(x, y)
    })
  }
  return 0
}

/**
 * 一级数组根据父ID转为多级
 */

export const jsonTree = (
  data,
  { id = 'id', pid = 'pid', children = 'children' } = {},
) => {
  const idMap = {};
  const treeData = [];
  data.forEach((v) => {
    idMap[v[id]] = v;
  });
  data.forEach((v) => {
    const parent = idMap[v[pid]];
    if (parent) {
      if (!parent[children]) {
        parent[children] = [];
      }
      v.__parent__ = parent;
      parent[children].push(v);
    } else {
      treeData.push(v);
    }
  });
  return treeData;
};

/**
 * 数组引用转对象引用
 */
export function arrayTransformObject(mapKey, data) {
  const o = {};
  data.forEach((item) => {
    o[item[mapKey]] = item;
  });
  return o;
}
/**
 * 获取枚举
 */
export const getEnums = (key) => {
  return Object.keys(appEnums[key] || {}).map((item) => ({
    value: item,
    text: appEnums[key][item],
    label: appEnums[key][item],
  }));
};

export const enums = (str) => {
  return appEnums[str];
  // return get(appEnums, str, '');
};