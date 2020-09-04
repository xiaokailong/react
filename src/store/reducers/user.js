let defaultState = {
  username: localStorage['username'] ? localStorage['username'] : '',
  isLogin: localStorage['isLogin'] ? localStorage['isLogin'] : false,
}
function counterReducer(state=defaultState, action){
  switch(action.type){
    case "LOGIN":
      localStorage['username']=action.data.username;
      localStorage['isLogin']=true;
      return {...state, ...action.data};
    case "OUTLOGIN":
      localStorage.clear();
      return {...state, ...action.data};
    default:
      return state;
  }
}

export default counterReducer;