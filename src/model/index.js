import {
  API_LOGIN,
  API_LOGOUT,
  API_MENUS,
  API_JAVA_CUSTOMERSALE_SALEMONEY,
} from '@/api'
import { responseFilter } from './middleware/responseFilter'
import { emitError } from './middleware/emitError'
import ORM from '@/services/ORM'

const resFliter = responseFilter('data.data')
const error = emitError()
const app = new ORM()


// 登录
export const postLogin = app.post(API_LOGIN)

// 退出
export const postLogout = app.post(API_LOGOUT)

// 菜单
export const getMenuList = app.get(API_MENUS, error, resFliter)

// java统计接口20200819
export const getCustomerSaleSaleMoney = app.get(API_JAVA_CUSTOMERSALE_SALEMONEY, error, resFliter)
