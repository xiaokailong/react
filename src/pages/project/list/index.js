
import React from "react";
import WrapTable from "@/components/HOC/WrapTable";
import {
  getAuthAuthUser,
} from '@/model';
import { Table, Tag } from 'antd';

function AjaxData(page, search) {
  return getAuthAuthUser(page, search);
}
class Details extends React.Component {
  /* 查询 */
  search = params => {
    this.props.setSearchParams(params);
  };

  componentDidMount() {
    this.props.setSearchParams();
    // authuser_list
  }
  render() {
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
        width: 80,
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
        width: 80,
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width: 100,
        ellipsis: {
          showTitle: false,
        },
      },
    ];
    const { dataSource, pagination, loading, locale } = this.props;
    return (
        <Table
          columns={columns} 
          dataSource={dataSource}
          locale={locale}
          loading={loading}
          pagination={pagination}
          scroll={{ y: 738 }}
        />
    );
  }
}

export default WrapTable(Details, AjaxData, "device-Drones-detail");