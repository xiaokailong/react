import storage from '@/services/Storage'
let defaultState = {
  token: sessionStorage['token'] ? sessionStorage['token'] : '',
}
function userReducer(state=defaultState, action){
  switch(action.type){
    case "LOGIN":
      storage.session.set('token', action.data.token )
      return {...state, ...action.data};
    case "LOGOUT":
      sessionStorage.clear();
      return {...state, ...action.data};
    default:
      return state;
  }
}

export default userReducer;