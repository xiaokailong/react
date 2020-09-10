import { lazy } from "react";

const goodsRouter = [
  {
    path: "/goods/list", 
    component: lazy(() => import("@/pages/test/goods")),
    routes: []
  },
  {
    path: '/goods/item',
    component: lazy(() => import("@/pages/test/goods/item")),
  },
  {
    path: '/goods/detail',
    component: lazy(() => import("@/pages/test/goods/detail")),
  },
  {
    path: '/goods/review',
    component: lazy(() => import("@/pages/test/goods/review")),
  },
]
export default goodsRouter;
