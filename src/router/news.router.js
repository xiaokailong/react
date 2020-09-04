import { lazy } from "react";

const newsRouter = {
  path: "/news",
  component: lazy(() => import("@/pages/news")),
  routes: [
    {
      path: '/news/index',
      exact: true,
      component: lazy(() => import("@/pages/news")),
    },
    {
      path: '/news/details',
      exact: true,
      component: lazy(() => import("@/pages/news/details")),
    },
  ]
}

export default newsRouter;
