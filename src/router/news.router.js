import { lazy } from "react";

const newsRouter = {
  path: "/news",
  component: lazy(() => import("@/pages/test/news")),
  routes: [
    {
      path: '/news/details',
      component: lazy(() => import("@/pages/test/news/details")),
    },
  ]
}

export default newsRouter;
