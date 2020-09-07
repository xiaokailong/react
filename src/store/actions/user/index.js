
import EventBus from '@/services/EventBus'
import {
  postLogin,
  // postLogout,
} from '@/model';

export function login(payload){
  return (dispatch)=>{
    postLogin(payload).then(res=>{
      if (res.data.flg * 1) {
        const dataTmp = {
          token: '',
          username: '',
          account: '',
          roleids: [],
        }
        dataTmp.token = res.data.data.token
        dataTmp.username = res.data.data.username
        dataTmp.account = res.data.data.account
        // dataTmp.roleids = res.data.data.user_roles.map(item => item.id)
        EventBus.emit('success', '登录成功！')
        dispatch({
          type:"LOGIN",
          data:dataTmp
        });
        payload.success(res);
      } else {
        EventBus.emit('error', res.data.msg)
        return false
      }
    });
  }
}

export function logout(){
  return {
    type: 'OUTLOGIN',
  }
}