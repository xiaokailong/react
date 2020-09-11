import {lazy} from 'react';

const userRouter = [
  {
    path: '/ucenter/user',
    component: lazy(()=>import('@/pages/ucenter/user')),
    title: "个人中心",
    auth: true,
  },
  {
    path: '/ucenter/config',
    component: lazy(()=>import('@/pages/ucenter/config')),
    title: "账户设置",
    auth: true,
  },
]

export default userRouter;