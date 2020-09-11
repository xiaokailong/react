function counterReducer(state={count: 0}, action){
  switch(action.type){
    case "inc":
      return {...state, ...action.data};
    case "dec":
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default counterReducer;