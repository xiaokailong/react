import React from 'react';
import { connect } from 'react-redux';
import { enums } from '@/utils/assist'
import EventBus from '@/services/EventBus'
import {getAuthAuthUser} from '@/model';
import zhCN from 'antd/es/locale/zh_CN';  // 引入中文包
import { Form, Input, Button, Table, Tooltip, Tag, Modal, ConfigProvider } from 'antd';
import StaffEdit from './StaffEdit';
class StaffList extends React.Component{
  constructor(){
    super();
    this.state={
      data: [],
      total: 500,
      loading: false,
      modalVisible: false,
      modalTitle: '',
      modalCurrentId: null,
    };
    this.query={
      name: '',
      page_no: 1,
      page_size: 25,
    };
  }
  componentDidMount(){
    this.fetchData();
    EventBus.emit('success','数据拉取成功！')
  }
  handleSearch(){
    this.fetchData({...this.query});
  }
  async fetchData(query={}){
    this.setState({loading: true})
    const {authuser_list} = await getAuthAuthUser({...query})
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
  changePage = page => {
    this.query.page_no = page;
    this.handleSearch();
  };
  changePageSize = (pageSize, current) => {
    this.query.page_no = current;
    this.query.page_size = pageSize;
    this.handleSearch();
  };
  handleAdd(){
    this.setState({
      modalTitle: '新增',
      modalVisible: true,
    });
  }
  handleEdit(item, e) {
    this.setState({
      modalCurrentId: item.id,
      modalTitle: '编辑',
      modalVisible: true,
    }, ()=>{
      // console.log(this.state.modalCurrentId,'@');
    });
  }
  handleDelete(item){
    console.log(item,'222222222222');
  }
  handleOk = e => {
    this.setState({
      modalCurrentId: null,
      modalVisible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      modalCurrentId: null,
      modalVisible: false,
    });
  };
  render(){
    // 表格列项
    const columns = [
      {
        title: '#',
        width: 40,
        render: (text,render,index) => <>{index+1}</>,
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
      {
        title: '操作',
        align: 'right',
        render: (text,render) => <>
          <Button type="link" onClick={this.handleEdit.bind(this, render)}>编辑</Button>
          <Button type="link" onClick={this.handleDelete.bind(this, render)}>删除</Button>
        </>,
      },
    ];
    // 表格分页属性
    const paginationProps = {
      size: "default",
      showSizeChanger: false,
      showTotal: () => `共500条`,
      pageSize: this.query.page_size,
      current: this.query.page_no,
      total: 500,
      onShowSizeChange: (current,pageSize) => this.changePageSize(pageSize,current),
      onChange: (current) => this.changePage(current),
    };
    return (
      <ConfigProvider locale={zhCN}>
        <Form layout="inline" className="search-bar">
          <Form.Item name="username">
            <Input placeholder="员工姓名" allowClear onChange={(e)=>{this.query.name = e.target.value}} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
          </Form.Item>
          <Form.Item className="fe-fr" style={{float: 'right !important'}}>
            <Button type="primary" onClick={this.handleAdd.bind(this)}>新增</Button>
          </Form.Item>
        </Form>
        {
          this.state.modalVisible && 
          <Modal title={this.state.modalTitle} width={800} visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <StaffEdit title="传值" id={this.state.modalCurrentId} />
          </Modal>
        }
        <Table 
          dataSource={this.state.data} 
          columns={columns} 
          size="small" 
          loading={this.state.loading}
          pagination={paginationProps}
          scroll={{ y: 738 }}
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