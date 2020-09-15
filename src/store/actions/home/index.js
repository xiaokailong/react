import { 
  getRbacRole, 
} from '@/model';

export function incCount(data){
  return {
    type: 'INC',
    data
  }
}

export function decCount(data){
  return {
    type: 'DEC',
    data
  }
}


export function getRoleList(payload){
  return (dispatch)=>{
    try {
      getRbacRole(payload).then(res =>{
        let data = [];
        data = res.role_list;
        dispatch({
          type: "ROLE_LIST",
          data: {roleList: data}
        });
      })
    } catch (error) {
      console.log(error);
      return false
    }
  }
}