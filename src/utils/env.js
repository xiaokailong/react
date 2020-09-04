/**
 * 判断是否为浏览器环境
 * @example
 * import {inBrowser} from '@/utils/env'
 * if (inBrowser) {
 *   // coding...
 * }
 */
export const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
/**
 * 判断是否为IE
 * @example
 * import {isIE} from '@/utils/env'
 * if (isIE) {
 *   // coding...
 * }
 */
export const isIE = UA && /msie|trident/.test(UA)
/**
 * 判断是否为IE9
 * @example
 * import {isIE9} from '@/utils/env'
 * if (isIE9) {
 *   // coding...
 * }
 */
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
/**
 * 判断是否为Edge
 * @example
 * import {isEdge} from '@/utils/env'
 * if (isEdge) {
 *   // coding...
 * }
 */
export const isEdge = UA && UA.indexOf('edge/') > 0
/**
 * 判断是否为Android
 * @example
 * import {isAndroid} from '@/utils/env'
 * if (isAndroid) {
 *   // coding...
 * }
 */
export const isAndroid = UA && UA.indexOf('android') > 0
/**
 * 判断是否为Ios
 * @example
 * import {isIOS} from '@/utils/env'
 * if (isIOS) {
 *   // coding...
 * }
 */
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
/**
 * 判断是否为Chrome
 * @example
 * import {isChrome} from '@/utils/env'
 * if (isChrome) {
 *   // coding...
 * }
 */
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
