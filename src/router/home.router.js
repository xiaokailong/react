import { lazy } from "react";

const homeRouter = [
  {
    path: "/", 
    component: lazy(() => import("@/pages/home")),
    exact: true,
  },
  {
    path: "/login",
    component: lazy(() => import("@/pages/login")),
    meta: "登录",
  },
  {
    path: "/test/staff",
    component: lazy(() => import("@/pages/test/staff")),
    meta: "员工列表",
    auth: true,
  },
];

export default homeRouter;
