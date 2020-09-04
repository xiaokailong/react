import {lazy} from 'react';

const userRouter = {
  path: '/user',
  component: lazy(()=>import('@/pages/user')),
  auth: true,
}

export default userRouter;