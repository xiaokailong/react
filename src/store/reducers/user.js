import storage from '@/services/Storage'
let defaultState = {
  token: sessionStorage['token'] ? sessionStorage['token'] : '',
  username: sessionStorage['username'] ? sessionStorage['username'] : '',
  account: sessionStorage['account'] ? sessionStorage['account'] : '',
}
function userReducer(state=defaultState, action){
  switch(action.type){
    case "LOGIN":
      storage.session.set('token', action.data.token )
      storage.session.set('username', action.data.username)
      storage.session.set('account', action.data.account)
      return {...state, ...action.data};
    case "OUTLOGIN":
      sessionStorage.clear();
      return {...state, ...action.data};
    default:
      return state;
  }
}

export default userReducer;