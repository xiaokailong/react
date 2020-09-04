
import {resfilter} from '@/services/Schema/units'
export const responseFilter = format => {
  return async function fn (m, next) {
    m.res = resfilter({format})(m.res)
    next()
  }
}
