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