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
];

export default homeRouter;
