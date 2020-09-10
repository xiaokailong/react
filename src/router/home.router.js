import { lazy } from "react";

const homeRouter = [
  {
    path: "/", 
    component: lazy(() => import("@/pages/home")),
    title: '首页',
    exact: true,
  },
  {
    path: "/login",
    component: lazy(() => import("@/pages/login")),
    title: "登录",
  },
  {
    path: "/test/staff",
    component: lazy(() => import("@/pages/test/staff")),
    title: "员工列表",
    auth: true,
  },
];

export default homeRouter;
