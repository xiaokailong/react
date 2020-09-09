import { lazy } from "react";

const newsRouter = [
  {
    path: "/news/list",
    component: lazy(() => import("@/pages/test/news")),
  },
  {
    path: '/news/details',
    component: lazy(() => import("@/pages/test/news/details")),
  },
]

export default newsRouter;
