import {
  API_LOGIN,
  API_MENUS,
  API_AUTH_AUTHUSER,
  API_AUTH_AUTHUSER_ID,
  API_AUTH_LOCK_ID,
  API_AUTH_NORMAL_ID,
  API_AUTH_USEUSER,
  API_RBAC_ROLE,
} from '@/api'
import { responseFilter } from './middleware/responseFilter'
import { emitError } from './middleware/emitError'
import ORM from '@/services/ORM'

const resFliter = responseFilter('data.result')
const error = emitError()
const app = new ORM()


// 登录
export const postLogin = app.post(API_LOGIN)

// 菜单
export const getMenuList = app.get(API_MENUS, error, resFliter)

// 员工
export const getAuthAuthUser = app.get(API_AUTH_AUTHUSER, error, resFliter);
export const postAuthAuthUser = app.post(API_AUTH_AUTHUSER, error, resFliter);
export const getAuthAuthUserById = app.get(API_AUTH_AUTHUSER_ID, error, resFliter);
export const putAuthAuthUserById = app.put(API_AUTH_AUTHUSER_ID, error, resFliter);
export const putAuthLockById = app.put(API_AUTH_LOCK_ID, error, resFliter);
export const putAuthNormalById = app.put(API_AUTH_NORMAL_ID, error, resFliter);
export const getAuthUseuser = app.get(API_AUTH_USEUSER, error, resFliter);
export const getRbacRole = app.get(API_RBAC_ROLE, error, resFliter);