
import homeRouter from './home.router.js'
import userRouter from './user.router.js'
import newsRouter from './news.router.js'
import goodsRouter from './goods.router.js'

const routers = [
  ...homeRouter,
  userRouter,
  newsRouter,
  goodsRouter,
];

export default routers;