
import EventBus from '@/services/EventBus'
import {
  postLogin,
  // postLogout,
} from '@/model';

export function login(payload){
  return (dispatch)=>{
    postLogin(payload).then(res=>{
      if (res.data.code === 100000) {
        const dataTmp = {
          token: '',
        }
        dataTmp.token = res.data.result.token
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