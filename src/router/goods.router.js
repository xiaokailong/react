import asyncComponent from '@/components/async/AsyncComponent';

const goodsRouter = [
  {
    path: "/goods/list", 
    component: asyncComponent(() => import("@/pages/test/goods")),
    title: "商品列表",
    routes: []
  },
  {
    path: '/goods/item',
    component: asyncComponent(() => import("@/pages/test/goods/item")),
    title: "商品信息",
  },
  {
    path: '/goods/detail',
    component: asyncComponent(() => import("@/pages/test/goods/detail")),
    title: "商品详细",
  },
  {
    path: '/goods/review',
    component: asyncComponent(() => import("@/pages/test/goods/review")),
    title: "商品评价",
  },
]
export default goodsRouter;
