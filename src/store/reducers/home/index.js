let defaultState = {
  count: 10,
  roleList: [], 
}
function homeReducer(state=defaultState, action){
  switch(action.type){
    case "INC":
      return {...state, ...action.data};
    case "DEC":
      return Object.assign({}, state, action.data);
    case "ROLE_LIST":
      return {...state, ...action.data};
    default:
      return state;
  }
}

export default homeReducer;