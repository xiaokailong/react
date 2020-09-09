import {lazy} from 'react';

const userRouter = [
  {
    path: "/project/list",
    component: lazy(() => import("@/pages/project/list")),
    meta: "项目列表",
  },
  {
    path: "/project/category",
    component: lazy(() => import("@/pages/project/category")),
    meta: "项目分类",
  },
]

export default userRouter;