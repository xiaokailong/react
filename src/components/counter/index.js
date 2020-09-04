import React from 'react';
import {connect} from 'react-redux';

class CounterComponent extends React.Component{
  constructor(){
    super()
    this.state={}
  }
  render(){
    return (
      <div>计数器子组件：{this.props.state.counter.count}</div>
    )
  }
}

export default connect((state)=>{
  return {
      state
  }
})(CounterComponent);