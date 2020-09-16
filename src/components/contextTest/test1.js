import React,{useContext} from 'react';
import AppContext from '@/context';
const Test1 = () => {

  const {aaa} = useContext(AppContext);
  return (
    <>
      <div>{aaa}</div>
      <div>context组件1</div>
    </>
  )
}

export default Test1;