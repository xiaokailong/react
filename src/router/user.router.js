import {lazy} from 'react';

const userRouter = {
  path: '/ucenter',
  component: lazy(()=>import('@/pages/user')),
  exact: true,
  auth: true,
}

export default userRouter;