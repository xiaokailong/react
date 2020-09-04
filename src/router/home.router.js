import { lazy } from "react";

const homeRouter = [
  {
    path: "/home", 
    component: lazy(() => import("@/layout/MainLayout")),
    routes: [
      {
        path: '/home/index',
        component: lazy(() => import("@/pages/home")),
        exact: true,
        title: "网站首页",
      },
    ]
  },
  {
    path: "/login",
    component: lazy(() => import("@/pages/login")),
    meta: "登录",
  },
];

export default homeRouter;
