import React from "react";
import {connect} from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import actions from '../../store/actions';
import EventBus from '@/services/EventBus';
import Css from './login.css'

class LoginPage extends React.Component {
  constructor(){
    super()
    this.state={
      username: '',
      password: '',
    }
  }
  componentDidMount(){
    EventBus.emit('info','为了方便演示，用户名密码可随意输入！')
    if(this.props.location.state){
      console.log("从"+this.props.location.state.from.pathname+"页面跳转而来");
    }
  }
  onFinish(values){
    if (this.state.username.match(/^\s*$/)) {
      alert("用户名不能为空");
      return;
    }
    if (this.state.password.match(/^\s*$/)) {
      alert("密码不能为空");
      return;
    }
    // this.props.dispatch((dispatch, getState)=>{
    //   // dispatch({
    //   //   type: 'LOGIN',
    //   //   data: {
    //   //     username: this.state.username,
    //   //     isLogin: true,
    //   //   }
    //   // })
    //   dispatch(actions.user.login({username: this.state.username, password: this.state.password}))
    //   console.log(getState());
    // })
    this.props.dispatch((dispatch,getState)=>{
      dispatch(actions.user.login({account:this.state.username,password:this.state.password,success:(res)=>{
        if (res.data.code === 100000){
          this.props.history.goBack();
        }
      }}))
    })
  }
  render() {
    return (
      <div className={Css['login-bg']}>
        <Form
          name="normal_login"
          className={Css['login-form']}
          size="large"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish.bind(this)}
        >
          <div className={Css['login-logo']}>
            <img src={require('../../assets/images/logo.png')} alt="" /> 
            Fan React Pro
          </div>
          <div className={Css['login-logo-desc']}>
            Fan React Pro 是一款最新的react前端框架
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={(e)=>{this.setState({username: e.target.value})}} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e)=>{this.setState({password: e.target.value})}}
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={Css['fan-pro-copyright']}>Copyright @ 2020 By FanJiahui</div>
      </div>
    )
  }
}

export default connect()(LoginPage);
