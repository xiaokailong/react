import {lazy} from 'react';

const userRouter = [
  {
    path: '/ucenter/user',
    component: lazy(()=>import('@/pages/ucenter/user')),
    auth: true,
  },
  {
    path: '/ucenter/config',
    component: lazy(()=>import('@/pages/ucenter/config')),
    auth: true,
  },
]

export default userRouter;