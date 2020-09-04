/*
 * api错误解析器
 */

const apiResultDefauts = {
  flg: -1,
  code: 0,
  msg: ''
}

/**
 * 验证code标识
 * @param {any} { code, msg }
 * @returns 验证结果
 */
function checkCode ({ code, msg }) {
  code = Number(code) || 100
  if (code >= 100000 && code < 200000) {
    return {
      status: 'success',
      msg: 'ok'
    }
  } else {
    return {
      status: 'error',
      msg: msg || '服务器错误！'
    }
  }
}

/**
 * 验证flg标识
 * @param {any} { flg, msg }
 * @returns 验证结果
 */
function checkFlg ({ flg, msg }) {
  switch (Number(flg)) {
    case 0:
      return {
        status: 'error',
        msg:
          msg || (process.env.NODE_ENV === 'production'
            ? '与服务器通讯失败，请检查网络连接或稍后再试！'
            : 'response中的flg标识符为0，表示错误， 但msg为空未返回错误信息！')
      }
    case 1:
      return {
        status: 'success',
        msg: 'ok'
      }
    default:
      return {
        status: 'error',
        msg:
          process.env.NODE_ENV === 'production'
            ? '与服务器通讯失败，请检查网络连接或稍后再试！'
            : '与代理服务器连接错误 或 flg标识不符合规范。'
      }
  }
}

function parseApiError (apiResult = apiResultDefauts) {
  const checkFlgResult = checkFlg(apiResult)
  if (checkFlgResult.status === 'error') return checkFlgResult
  return checkCode(apiResult)
}

export default parseApiError
