import asyncComponent from '@/components/async/AsyncComponent';

const newsRouter = [
  {
    path: "/news/list",
    component: asyncComponent(() => import("@/pages/test/news")),
    title: "新闻列表",
  },
  {
    path: '/news/details',
    component: asyncComponent(() => import("@/pages/test/news/details")),
    title: "新闻详细",
  },
]

export default newsRouter;
