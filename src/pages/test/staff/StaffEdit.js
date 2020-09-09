import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { getAuthAuthUserById } from '@/model';

class StaffEdit extends Component{
  constructor(){
    super();
    this.state={
      name: '',
      mobile: '',
      account: '',
    }
  }
  componentDidMount(){
    this.fetchData();
  }
  async fetchData(){
    if(this.props.id) {
      const {authuser_obj} = await getAuthAuthUserById({id: this.props.id})
      console.log(authuser_obj,'@@@@@@@@@@@@@@@@@@@');
      this.setState({
        name: authuser_obj.name,
        mobile: authuser_obj.mobile,
        account: authuser_obj.account,
      })
    }
  }
  render() {
    return (
      <>
        <Form>
          <Form.Item label="姓名">
            <Input value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
          </Form.Item>
          <Form.Item label="手机">
            <Input value={this.state.mobile} />
          </Form.Item>
          <Form.Item label="账号">
            <Input value={this.state.account} />
          </Form.Item>
          <Form.Item label="密码">
            <Input />
          </Form.Item>
        </Form>
        <p>{this.state.name}</p>
        <p>sadfasdf----{this.props.id}</p>
        <Button type="primary" onClick={()=>this.props.saveClick('这是子组件传递过来的值')}>点击向父组件传值</Button>
      </>
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