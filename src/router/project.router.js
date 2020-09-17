import asyncComponent from '@/components/async/AsyncComponent';

const userRouter = [
  {
    path: "/project/list",
    component: asyncComponent(() => import("@/pages/project/list")),
    auth: true,
    title: "项目列表",
  },
  {
    path: "/project/category",
    component: asyncComponent(() => import("@/pages/project/category")),
    auth: true,
    title: "项目分类",
  },
]

export default userRouter;