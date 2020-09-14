import React from "react";

/**
 * 表格组件包装函数 统一操作数据请求,分页,权限校验
 *
 * @param {antd Table} TableComponent 表格组件
 * @param {function} AjaxData 列表请求接口
 * @returns
 */
const TableWrap = (TableComponent, AjaxData) =>
  class TableWrapClass extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        pagination: {
          current: 1,
          pageSize: 25,
          showQuickJumper: false,
          showSizeChanger: false,
          pageSizeOptions: ["25", "50", "100"],
          onShowSizeChange: this.pageSizeChange,
          onChange: this.pageChange,
          showTotal: this.showTotal
        },
        searchParams: {},
        dataChange: {},
        dataSource: [],
        loading: false,
        locale: {
          emptyText: "暂无数据"
        }
      };
    }

    // 总共条数
    showTotal = total => `共${total}条记录 `;

    componentDidMount() {
    }

    /**
     * 对外调用--设置搜索参数然后查询
     *
     * @param {Object} searchParams 搜索参数对象
     * @param {boolean} [useOldParams=false] 是否使用原来的参数查询
     */
    setSearchParams = (searchParams) => {
      this.setState(
        {
          searchParams
        },
        () => {
          this.searchBaseLand(1);
        }
      );
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

    /**
     * 请求数据
     *
     * @param {Object} [page={}] 分页参数
     */
    getTableData = (page = {}) => {
      const { pagination, searchParams } = this.state;
      this.setState({loading: true});
      AjaxData(page, searchParams).then(data => {
        const dataSource = data;
        const current = page.page_no;
        this.setState(
          {
            dataSource,
            pagination: {
              ...pagination,
              total: 500,
              current
            },
            loading: false
          }
        );
      }).catch(err => {
        console.log(err);
      });
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

    render() {
      const { pagination, loading, dataSource, locale } = this.state;
      const newProps = {
        setSearchParams: this.setSearchParams,
        getListData: this.searchBaseLand,
        pagination,
        loading,
        dataSource,
        locale,
      };
      return <TableComponent {...newProps} {...this.props} />;
    }
  };

export default TableWrap;