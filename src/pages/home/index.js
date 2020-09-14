import React from 'react';
import {connect} from 'react-redux';
import CounterComponent from '@/components/counter';
import actions from '@/store/actions';    // redux-thunk
// import actions from '@/storeSaga/actions';    // redux-saga
import { Button } from 'antd';

class HomeIndex extends React.Component{
  constructor() {
    super();
    this.state={};
    this.num = 0;
  }
  componentDidMount(){
  }
  incCount () {
    // redux-thunk  写法
    this.props.dispatch((dispatch, getState) => {
      dispatch(actions.home.incCount({count: ++this.props.state.home.count}));
    })

    // redux-saga  写法
    // this.props.dispatch(actions.home.incCount({count: ++this.num}))
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

    // redux-thunk  写法
    this.props.dispatch((dispatch, getState) => {
      dispatch(actions.home.decCount({count: --this.props.state.home.count}));
    })

    // redux-saga  写法
    // this.props.dispatch(actions.home.decCount({count: --this.num}))
  }
  render() {
    return (
      <div>
        <CounterComponent></CounterComponent>
        计数器:<Button type="primary" onClick={this.decCount.bind(this)}>-</Button> {this.props.state.home.count} <Button type="primary" onClick={this.incCount.bind(this)}>+</Button>
      </div>
    )
  }
}

export default connect((state)=>({state}))(HomeIndex);