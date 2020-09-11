// 属性代理高阶组件
import React from 'react';

const Hoc = WithComponent =>{
  return class HocComponent extends React.Component {
    render(){
      return (
        <>
          <WithComponent {...this.props}></WithComponent>
        </>
      )
    }
  }
}

export default Hoc