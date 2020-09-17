import React from "react";
import {connect} from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import actions from '../../store/actions';
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
    this.props.dispatch((dispatch,getState)=>{
      dispatch(actions.user.login({account:this.state.username,password:this.state.password,success:(res)=>{
        if (res.data.code === 100000){
          this.props.history.push('/');
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
                message: '请输入用户名!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="admin" onChange={(e)=>{this.setState({username: e.target.value})}} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="666666"
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
