import { lazy } from "react";

const goodsRouter = {
  path: "/goods", 
  component: lazy(() => import("@/pages/goods")),
  routes: [
    {
      path: "/goods/index",
      component: lazy(() => import("@/pages/goods")),
      routes: [
        {
          path: '/goods/item',
          component: lazy(() => import("@/pages/goods/item")),
          exact: true,
        },
        {
          path: '/goods/detail',
          component: lazy(() => import("@/pages/goods/detail")),
          exact: true,
        },
        {
          path: '/goods/review',
          component: lazy(() => import("@/pages/goods/review")),
          exact: true,
        },
      ]
    },
  ]
}
export default goodsRouter;
