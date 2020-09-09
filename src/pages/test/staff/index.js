import React from 'react';
import { connect } from 'react-redux';
import { enums } from '@/utils/assist'
import EventBus from '@/services/EventBus'
import {getAuthAuthUser} from '@/model';
import { Form, Input, Button, Table, Tooltip, Tag, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';  // 引入中文包
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
    EventBus.emit('success','数据拉取成功！')
    this.setState({data: data, loading: false})
  }
  changePage = page => {
    console.log(page);
    this.setState({
      current: page,
    });
  };
  handleSearch(){
    console.log(111);
  }
  render(){
    // 表格列项
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
        render: (text,render) => <Tag color={enums(`USER_STATUS_COLOR`)[text]}>{enums(`USER_STATUS`)[text]}</Tag>,
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
    // 表格分页属性
    const paginationProps = {
      size: "default",
      showTotal: () => `共500条`,
      pageSize: 25,
      current: 1,
      total: 500,
      // onShowSizeChange: (current,pageSize) => this.changePageSize(pageSize,current),
      onChange: (current) => this.changePage(current),
    };
    return (
      <ConfigProvider locale={zhCN}>
        <Form layout="inline">
          <Form.Item name="username">
            <Input placeholder="员工姓名" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
          </Form.Item>
        </Form>
        <Table 
          dataSource={this.state.data} 
          columns={columns} 
          size="small" 
          loading={this.state.loading}
          pagination={paginationProps}
          scroll={{ y: 746 }}
        />
      </ConfigProvider>
    )
  }
}

export default connect((state)=>{
  return {
      state
  }
})(StaffList);