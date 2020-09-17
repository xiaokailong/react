import asyncComponent from '@/components/async/AsyncComponent';

const userRouter = [
  {
    path: '/ucenter/user',
    component: asyncComponent(()=>import('@/pages/ucenter/user')),
    title: "个人中心",
    auth: true,
  },
  {
    path: '/ucenter/config',
    component: asyncComponent(()=>import('@/pages/ucenter/config')),
    title: "账户设置",
    auth: true,
  },
]

export default userRouter;