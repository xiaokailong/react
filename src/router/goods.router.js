import { lazy } from "react";

const goodsRouter = [
  {
    path: "/goods/list", 
    component: lazy(() => import("@/pages/test/goods")),
    title: "商品列表",
    routes: []
  },
  {
    path: '/goods/item',
    component: lazy(() => import("@/pages/test/goods/item")),
    title: "商品信息",
  },
  {
    path: '/goods/detail',
    component: lazy(() => import("@/pages/test/goods/detail")),
    title: "商品详细",
  },
  {
    path: '/goods/review',
    component: lazy(() => import("@/pages/test/goods/review")),
    title: "商品评价",
  },
]
export default goodsRouter;
