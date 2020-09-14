import React from 'react';
import { connect } from 'react-redux';
import { enums } from '@/utils/assist'
import { relativeTime } from '@/utils/dayjs'
import EventBus from '@/services/EventBus'
import {
  getAuthAuthUser,
  putAuthLockById,
  putAuthNormalById,
} from '@/model';
import { Form, Input, Button, Table, Tooltip, Tag, Switch, Modal, Popconfirm } from 'antd';
import StaffEdit from './StaffEdit';
class StaffList extends React.Component{
  constructor(){
    super();
    this.state={
      data: [],
      total: 318,
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
    this.fetchData({...this.query, account: this.query.name});
  }
  async fetchData(query=this.query){
    try {
      this.setState({loading: true})
      const {authuser_list} = await getAuthAuthUser({...query, account: query.name})
      const data = authuser_list.map(item=>({
        ...item,
        key: item.id,
      }))
      this.setState({data, loading: false})
    } catch (err) {
      console.log(err);
    }
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
  // 新增
  handleAdd(){
    this.setState({
      modalTitle: '新增',
      modalVisible: true,
    });
  }
  // 编辑
  handleEdit(item, e) {
    this.setState({
      modalCurrentId: item.id,
      modalTitle: '编辑',
      modalVisible: true,
    }, ()=>{
      // console.log(this.state.modalCurrentId,'@');
    });
  }
  // 删除
  handleDelete(item){
    try {
      console.log(item,'删除操作');
    } catch (err) {
      console.log(err);
    }
  }
  // 模态框确定
  handleOk = e => {
    this.setState({
      modalCurrentId: null,
      modalVisible: false,
    });
    this.handleSearch();
  };
  // 模态框取消
  handleCancel = e => {
    this.setState({
      modalCurrentId: null,
      modalVisible: false,
    });
  };
  // 列表锁写/解锁
  async handleStatusChange(status, item, checked) {
    try {
      if(status === 'NORMAL') {
        await putAuthLockById({id: item.id})
      } else {
        await putAuthNormalById({id: item.id})
      }
      EventBus.emit('success', '操作成功!');
      this.handleSearch();
    } catch (err) {
      EventBus.emit('error', '操作失败!');
      console.log(err);
    }
  }
  render(){
    // 表格列项
    const columns = [
      {
        title: '#',
        width: 60,
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
        width: 80,
        render: (text,render) => <Tag color={enums(`USER_STATUS_COLOR`)[text]}>{enums(`USER_STATUS`)[text]}</Tag>,
      },
      {
        title: '权限',
        dataIndex: 'user_role_list',
        width: 280,
        render: (user_role_list) => {
          return user_role_list.length > 0 && user_role_list.map(item=><Tag color="geekblue" key={item.id}>{item.name}</Tag>)
        }
      },
      {
        title: '锁定/解锁',
        dataIndex: 'status',
        width: 120,
        render: (status,render) => <Switch checkedChildren="正常" unCheckedChildren="锁定" checked={status === 'NORMAL'} onChange={this.handleStatusChange.bind(this,status,render)} />
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width: 100,
        ellipsis: {
          showTitle: false,
        },
        render: text => (
          <Tooltip placement="top" title={text}>
            {relativeTime(text)}
          </Tooltip>
        ),
      },
      {
        title: '操作',
        align: 'right',
        render: (text,render) => <>
          <Button type="link" onClick={this.handleEdit.bind(this, render)}>编辑</Button>
          <Popconfirm
            placement="bottomRight"
            title="确认删除该条信息吗？"
            onConfirm={this.handleDelete.bind(this, render)}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </>,
      },
    ];
    // 表格分页属性
    const paginationProps = {
      size: "default",
      showSizeChanger: false,
      showTotal: () => `共${this.state.total}条`,
      pageSize: this.query.page_size,
      current: this.query.page_no,
      total: this.state.total,
      onShowSizeChange: (current,pageSize) => this.changePageSize(pageSize,current),
      onChange: (current) => this.changePage(current),
    };
    return (
      <>
        <Form layout="inline" className="search-bar">
          <Form.Item>
            <Input placeholder="员工姓名" allowClear onChange={(e)=>{this.query.name = e.target.value}} onPressEnter={this.handleSearch.bind(this)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleSearch.bind(this)}>搜索</Button>
          </Form.Item>
          <Form.Item className="fe-fr">
            <Button type="primary" onClick={this.handleAdd.bind(this)}>新增</Button>
          </Form.Item>
        </Form>
        <Table 
          dataSource={this.state.data} 
          columns={columns} 
          size="small" 
          loading={this.state.loading}
          pagination={paginationProps}
          scroll={{ y: 718 }}
        />
        {
          this.state.modalVisible && 
          <Modal title={this.state.modalTitle} width={800} visible={this.state.modalVisible} footer={null} onOk={this.handleOk} onCancel={this.handleCancel}>
            <StaffEdit title="传值" id={this.state.modalCurrentId} onOk={this.handleOk} />
          </Modal>
        }
      </>
    )
  }
}

export default connect((state)=>{
  return {
      state
  }
})(StaffList);