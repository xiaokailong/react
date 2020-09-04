import {
  API_JAVA_CUSTOMERSALE_SALEMONEY
} from '@/api'
import { responseFilter } from './middleware/responseFilter'
import { emitError } from './middleware/emitError'
import ORM from '@/services/ORM'

const resFliter = responseFilter('data.data')
const error = emitError()
const app = new ORM()

// java统计接口20200819
export const getCustomerSaleSaleMoney = app.get(API_JAVA_CUSTOMERSALE_SALEMONEY, error, resFliter)
