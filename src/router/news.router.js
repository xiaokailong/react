import { lazy } from "react";

const newsRouter = {
  path: "/news",
  component: lazy(() => import("@/pages/news")),
  routes: [
    {
      path: '/news/details',
      component: lazy(() => import("@/pages/news/details")),
    },
  ]
}

export default newsRouter;
