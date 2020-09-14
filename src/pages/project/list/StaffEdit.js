import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Form, Input, Button, Checkbox } from 'antd';
import EventBus from '@/services/EventBus';
import { 
  getAuthAuthUserById, 
  getRbacRole, 
  postAuthAuthUser, 
  putAuthAuthUserById, 
} from '@/model';

class StaffEdit extends Component{
  constructor(){
    super();
    this.state={
      loading: true,
      role_list: [],
      name: '',
      mobile: '',
      account: '',
      password: '',
      role_ids: [],
    }
  }
  componentDidMount(){
    this.fetchData();
    // const key = this.state.password === '123456' ? '_password' : 'password';
  }
  async fetchData(){
    try {
      if(this.props.id) {
        const {authuser_obj} = await getAuthAuthUserById({id: this.props.id})
        this.setState({
          name: authuser_obj.name,
          mobile: authuser_obj.mobile,
          account: authuser_obj.account,
          password: '123456',
          role_ids: authuser_obj.role_ids,
        })
      }
      const {role_list} = await getRbacRole();
      this.setState({
        role_list: role_list.map(item=>({
          label: item.name,
          value: item.id,
        })),
        loading: false,
      })
    } catch (error) {
      console.log(error);
    }
  }
  handleCheckdChange(checkedValue){
    this.setState({role_ids: checkedValue})
  }
  // 保存
  async handleSave(){
    try {
      if(this.props.id){
        const key = this.state.password === '123456' ? '_password' : 'password';
        await putAuthAuthUserById({
          id: this.props.id,
          name: this.state.name,
          account: this.state.account,
          [key]: this.state.password,
          role_ids: this.state.role_ids,
        })
      } else {
        await postAuthAuthUser({
          name: this.state.name,
          mobile: this.state.mobile,
          account: this.state.account,
          password: this.state.password,
          role_ids: this.state.role_ids,
        })
      }
      this.props.onOk('这是子组件传递过来的值')
      EventBus.emit('success', '保存成功');
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <Skeleton paragraph={{ rows: 6, width: 200 }} size="large" loading={this.state.loading} active>
        <Form labelCol={{ span: 2 }} wrapperCol={{span: 24}}>
          <Form.Item label="姓名">
            <Input value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
          </Form.Item>
          <Form.Item label="手机">
            {this.props.id ? <span>{this.state.mobile}</span> : <Input value={this.state.mobile} onChange={(e)=>{this.setState({mobile: e.target.value})}} />}
          </Form.Item>
          <Form.Item label="账号">
            <Input value={this.state.account} onChange={(e)=>{this.setState({account: e.target.value})}} />
          </Form.Item>
          <Form.Item label="密码">
            <Input.Password value={this.state.password} onChange={(e)=>{this.setState({password: e.target.value})}} />
          </Form.Item>
          <Form.Item label="角色">
            <Checkbox.Group options={this.state.role_list} defaultValue={this.state.role_ids} onChange={this.handleCheckdChange.bind(this)} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 24 }}>
            <Button type="primary" onClick={()=>{this.handleSave()}}>保存</Button>
          </Form.Item>
        </Form>
      </Skeleton>
    )
  }
}
// 类型检测
StaffEdit.propTypes = {
  title: PropTypes.string.isRequired,
}
//默认值
StaffEdit.defaultProps = {
  title: '新增'
}

export default StaffEdit;