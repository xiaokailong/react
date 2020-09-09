import React from 'react';
import {connect} from 'react-redux';
import CounterComponent from '@/components/counter';
import actions from '@/store/actions';
import { Button } from 'antd';

class HomeIndex extends React.Component{
  constructor() {
    super();
    this.state={
      data: []
    };
    this.num = 0;
  }
  componentDidMount(){
  }
  incCount () {
    // this.props.dispatch((dispatch, getState)=>{
    //   dispatch({
    //     type: 'INC',
    //     data: {
    //       count: ++this.num
    //     }
    //   })
    //   console.log(getState());
    // })
    this.props.dispatch((dispatch, getState) => {
      dispatch(actions.counter.incCount({count: ++this.num}));
    })
  }
  decCount () {
    // this.props.dispatch({
    //   type: 'DEC',
    //   data: {
    //     count: --this.num
    //   }
    // })
    // this.props.dispatch((dispatch, getState)=>{
    //   dispatch({
    //     type: 'DEC',
    //     data: {
    //       count: --this.num
    //     }
    //   })
    // })
    this.props.dispatch((dispatch, getState) => {
      dispatch(actions.counter.decCount({count: --this.num}));
    })
  }
  render() {
    return (
      <div>
        <i className="iconfont icon-logo"></i>
        {/* {
          this.state.data.map((item,index)=>{
            return (
              <div key={index}>{item.customer_name}</div>
            )
          })
        } */}
        <CounterComponent></CounterComponent>
        计算器:<Button type="primary" onClick={this.decCount.bind(this)}>-</Button> {this.props.state.counter.count} <Button type="primary" onClick={this.incCount.bind(this)}>+</Button>
      </div>
    )
  }
}

export default connect((state)=>({state}))(HomeIndex);