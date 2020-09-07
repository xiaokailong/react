import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CounterComponent from '@/components/counter';
import actions from '@/store/actions';
import {getCustomerSaleSaleMoney} from '@/model';
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
    this.getData();
    // console.log(process.env.REACT_APP_NODE_ENV,'@@@@@@@@@');
  }
  async getData(){
    const data = await getCustomerSaleSaleMoney({
      type: 'money',
      date: '2020-08'
    })

    this.setState({data: data.datas})
    console.log(this.state.data);
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
        <div><Link to="/">首页</Link></div>
        <div><Link to="/news">新闻页面</Link></div>
        <div><Link to="/goods">商品页面</Link></div>
        <div><Link to="/login">登录</Link></div>
        <div><Link to="/user">个人中心</Link></div>
        <br /><br /><br /><br />
        <CounterComponent></CounterComponent>
        计算器:<Button type="primary" onClick={this.decCount.bind(this)}>-</Button> {this.props.state.counter.count} <Button type="primary" onClick={this.incCount.bind(this)}>+</Button>
      </div>
    )
  }
}

export default connect((state)=>({state}))(HomeIndex);