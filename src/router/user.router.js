import {lazy} from 'react';

const userRouter = {
  path: '/ucenter',
  component: lazy(()=>import('@/pages/user')),
  auth: true,
}

export default userRouter;