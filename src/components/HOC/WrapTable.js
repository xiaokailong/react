import React from "react";
import { get } from "lodash";

/**
 * 表格组件包装函数 统一操作数据请求,分页,权限校验
 *
 * @param {antd Table} TableComponent 表格组件
 * @param {function} AjaxData 列表请求接口
 * @param {String} rightCode 权限码
 * @returns
 */
const WrapTable = (TableComponent, AjaxData, rightCode) =>
  class WrapTableClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pagination: {
          current: 1,
          pageSize: 25,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ["10", "30", "50"],
          onShowSizeChange: this.pageSizeChange,
          onChange: this.pageChange,
          showTotal: this.showTotal
        },
        searchParams: props.searchParams || {},
        dataChange: {},
        dataSource: [],
        loading: false,
        locale: {
          emptyText: "暂无数据"
        }
      };
    }

    componentDidMount() {
    }

    /**
     * 请求数据
     *
     * @param {Object} [page={}] 分页参数
     */
    getTableData = (page = {}) => {
      const { searchParams, pagination } = this.state;
      this.setState({
        loading: true
      });
      AjaxData(
        {
          ...page,
          ...searchParams
        },
        searchParams
      )
        .then(res => {
          // 部分接口没有list分页,使用res.data
          const dataSource = res.authuser_list.map(item=>({
            ...item,
            key: item.id,
          }))
          const current = get(res, "data.pager.pageIndex", 1);
          this.setState(
            {
              dataSource,
              pagination: {
                ...pagination,
                total: 500,
                current
              },
              loading: false
            },
            () => {
              if (dataSource && !dataSource.length && current !== 1) {
                this.getTableData({
                  pageIndex: current - 1
                });
              }
            }
          );
        })
        .catch(err => {
          if (!err.isCancel) {
            this.setState({
              dataSource: [],
              pagination: {
                ...pagination,
                total: 0,
                current: 1
              },
              loading: false
            });
          }
        });
    };

    // 查询
    searchBaseLand = pageIndex => {
      const { pagination } = this.state;
      const page = {
        page_no: pageIndex || pagination.current,
        page_size: pagination.pageSize
      };
      this.getTableData(page);
    };

    // 页面条数改变
    pageSizeChange = (page, pageSize) => {
      const { pagination } = this.state;
      this.setState(
        {
          pagination: {
            ...pagination,
            pageSize,
            current: 1
          }
        },
        () => {
          this.searchBaseLand();
        }
      );
    };

    // 页面改变
    pageChange = current => {
      const { pagination } = this.state;
      this.setState(
        {
          pagination: {
            ...pagination,
            current
          }
        },
        () => {
          const { pagination } = this.state;
          this.searchBaseLand(pagination.current);
        }
      );
    };

    // 总共条数
    showTotal = total => `共${total}条记录 `;

    // 对外调用--修改dataSource
    editDataSource = dataChange => {
      let { dataSource } = this.state;
      dataSource = [...dataSource];
      const child = dataSource[dataChange.index];
      const params = {
        ...child
      };
      dataChange.update.forEach(item => {
        params[item.field] = item.value;
      });
      dataSource.splice(dataChange.index, 1, params);
      this.setState({
        dataSource
      });
    };

    // 清空dataSource
    clearDataSource = () => {
      this.setState({
        dataSource: []
      });
    };

    /**
     * 对外调用--设置搜索参数然后查询
     *
     * @param {Object} searchParams 搜索参数对象
     * @param {boolean} [useOldParams=false] 是否使用原来的参数查询
     */
    setSearchParams = (searchParams, useOldParams = false) => {
      if (useOldParams) {
        this.searchBaseLand("");
      } else {
        this.setState(
          {
            searchParams
          },
          () => {
            this.searchBaseLand(1);
          }
        );
      }
    };

    render() {
      const { pagination, loading, dataSource, locale } = this.state;
      const newProps = {
        setSearchParams: this.setSearchParams,
        editDataSource: this.editDataSource,
        getListData: this.searchBaseLand,
        clearDataSource: this.clearDataSource,
        pagination,
        loading,
        dataSource,
        locale,
        rowKey: (x, i) => i
      };
      return <TableComponent {...newProps} {...this.props} />;
    }
  };

export default WrapTable;