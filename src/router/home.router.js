import asyncComponent from '@/components/async/AsyncComponent';

const homeRouter = [
  {
    path: "/home", 
    component: asyncComponent(() => import("@/pages/home")),
    title: '首页',
    auth: true,
  },
  {
    path: "/test/staff",
    component: asyncComponent(() => import("@/pages/test/staff")),
    title: "员工列表",
    auth: true,
  },
];

export default homeRouter;
