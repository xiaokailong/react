
import React,{Component} from "react";
import TableWrap from "@/components/Hoc/TableWrap";
import { enums } from '@/utils/assist'
import { relativeTime } from '@/utils/dayjs'
import { Button, Table, Tooltip, Tag, Switch, Popconfirm, Form, Input, Modal } from 'antd';
import RoleSelect from '@/components/RoleSelect'
import StaffEdit from './StaffEdit';
import EventBus from '@/services/EventBus';
import {
  getAuthAuthUser,
  putAuthLockById,
  putAuthNormalById,
} from '@/model';
    
const AjaxData = (page, search) => {
  return getAuthAuthUser({...page, ...search}).then(res=>res.authuser_list);
}

class ProjectList extends Component {
  constructor(){
    super();
    this.state={
      modalVisible: false,
      modalTitle: '',
      modalCurrentId: null,
    };
    this.query={
      name: '',
      account: '',
      rids: [],
    };
  }
  // 查询
  handleSearch(){
    this.props.setSearchParams({...this.query, account: this.query.name});
  };

  componentDidMount() {
    this.handleSearch();
  }
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
  // 搜索栏-角色下拉切换
  handleRoleSelect(val){
    this.query.rids=val ? val : [];
    this.handleSearch();
  }
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
  render() {
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
    const { dataSource, pagination, loading, locale } = this.props;
    return (
      <>
        <Form layout="inline" className="search-bar">
          <Form.Item>
            <RoleSelect onChange={this.handleRoleSelect.bind(this)} />
          </Form.Item>
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
          rowKey={x => x.id}
          columns={columns} 
          dataSource={dataSource}
          locale={locale}
          loading={loading}
          pagination={pagination}
          scroll={{y: 680}}
        />
        {
          this.state.modalVisible && 
          <Modal title={this.state.modalTitle} width={800} visible={this.state.modalVisible} footer={null} onOk={this.handleOk} onCancel={this.handleCancel}>
            <StaffEdit title="传值" id={this.state.modalCurrentId} onOk={this.handleOk} />
          </Modal>
        }
      </>
    );
  }
}

export default TableWrap(ProjectList, AjaxData);