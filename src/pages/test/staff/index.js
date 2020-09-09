import React from 'react';
import {connect} from 'react-redux';
import {getAuthAuthUser} from '@/model';
import { Form, Input, Button, Table, Pagination, Tooltip } from 'antd';

const columns = [
  {
    title: '#',
    width: 40,
    render: (text,render,index) => <>{index}</>,
  },
  {
    title: 'ID',
    dataIndex: ['id'],
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    render: (text,render) => <span>{text}</span>,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
  },
  {
    title: '登录账号',
    dataIndex: 'account',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '登录设备',
    dataIndex: 'device_type',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    ellipsis: {
      showTitle: false,
    },
    render: text => (
      <Tooltip placement="top" title={text}>
        {text}
      </Tooltip>
    ),
  },
];
class StaffList extends React.Component{
  constructor(){
    super();
    this.state={
      data: [],
      total: 500,
      loading: false,
    };
    this.num = 0;
  }
  componentDidMount(){
    this.getData();
    // console.log(process.env.REACT_APP_NODE_ENV,'@@@@@@@@@');
  }
  async getData(){
    this.setState({loading: true})
    const {authuser_list} = await getAuthAuthUser()
    const data = authuser_list.map(item=>({
      key: item.id,
      account: item.account,
      create_time: item.create_time,
      device_type: item.device_type,
      id: item.id,
      mobile: item.mobile,
      name: item.name,
      status: item.status,
      // user_role_list: []
    }))
    this.setState({data: data, loading: false})
  }
  render(){
    return (
      <div>
        <Form name="horizontal_login" layout="inline">
          <Form.Item name="username">
            <Input placeholder="员工姓名" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
              >
                搜索
              </Button>
            )}
          </Form.Item>
        </Form>
        <Table 
          dataSource={this.state.data} 
          columns={columns} 
          size="small" 
          loading={this.state.loading}
          pagination={false}
          scroll={{ y: 600 }}
        />
        <Pagination
          size="small"
          total={this.state.total}
          showTotal={total => `共 ${total} 条`}
          defaultPageSize={25}
          defaultCurrent={1}
        />
      </div>
    )
  }
}

export default connect((state)=>{
  return {
      state
  }
})(StaffList);