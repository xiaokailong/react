export function login(data){
  return {
    type: 'LOGIN',
    data
  }
}

export function outLogin(data){
  return {
    type: 'OUTLOGIN',
  }
}