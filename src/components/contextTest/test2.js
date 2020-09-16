import React,{useContext} from 'react';
import AppContext from '@/context';
const Test2 = () => {

  const {aaa} = useContext(AppContext);
  return (
    <>
      <div>{aaa}</div>
      <div>context组件2</div>
    </>
  )
}

export default Test2;