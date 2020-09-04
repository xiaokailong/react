function counterReducer(state={count: 0}, action){
  switch(action.type){
    case "INC":
      return {...state, ...action.data};
    case "DEC":
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default counterReducer;