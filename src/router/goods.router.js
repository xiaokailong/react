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
    exact: true,
  },
  {
    path: '/goods/detail',
    component: lazy(() => import("@/pages/test/goods/detail")),
    exact: true,
  },
  {
    path: '/goods/review',
    component: lazy(() => import("@/pages/test/goods/review")),
    exact: true,
  },
]
export default goodsRouter;
