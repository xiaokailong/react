import React from "react";
import {connect} from 'react-redux';
import actions from '../../store/actions';
import EventBus from '@/services/EventBus';

class LoginPage extends React.Component {
  constructor(){
    super()
    this.state={
      username: '',
      password: '',
    }
  }
  componentDidMount(){
    if(this.props.location.state){
      console.log("从"+this.props.location.state.from.pathname+"页面跳转而来");
    }
  }
  doLogin(){
    if (this.state.username.match(/^\s*$/)) {
      alert("用户名不能为空");
      return;
    }
    if (this.state.password.match(/^\s*$/)) {
      alert("密码不能为空");
      return;
    }
    this.props.dispatch((dispatch, getState)=>{
      // dispatch({
      //   type: 'LOGIN',
      //   data: {
      //     username: this.state.username,
      //     isLogin: true,
      //   }
      // })
      dispatch(actions.user.login({username: this.state.username, isLogin: true,}))
      console.log(getState());
    })
    EventBus.emit('success','登录成功！')
    this.props.history.go(-1);
  }
  render() {
    return (
      <div>
        <div>用户名：<input type="text" onChange={(e)=>{this.setState({username: e.target.value})}}></input></div>
        <div>密码：<input type="text" onChange={(e)=>{this.setState({password: e.target.value})}}></input></div>
        <button type="button" onClick={this.doLogin.bind(this)}>登录</button>
      </div>
    )
  }
}

export default connect()(LoginPage);
