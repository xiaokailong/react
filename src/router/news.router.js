import { lazy } from "react";

const newsRouter = [
  {
    path: "/news/list",
    component: lazy(() => import("@/pages/test/news")),
    title: "新闻列表",
  },
  {
    path: '/news/details',
    component: lazy(() => import("@/pages/test/news/details")),
    title: "新闻详细",
  },
]

export default newsRouter;
