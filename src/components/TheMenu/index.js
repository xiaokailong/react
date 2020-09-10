import React, {Component} from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import { jsonTree } from '@/utils/assist';
// import { getMenuList } from '@/model';
import MenuMockData from '@/mock/menu'
const { SubMenu } = Menu;

class TheMenu extends Component{
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      activeKey: '18',
      mode: "inline",
      data: [],
    };
  }
  componentDidMount(){
    this.getData();
  }
  async getData(){
    // const {menu_list} = await getMenuList()
    // const data = jsonTree(menu_list,{pid: 'parent_id'})
    const data = jsonTree(MenuMockData,{pid: 'parent_id'})
    // this.setState({data})
    this.setState((state)=>{
      return {
        data
      }
    })
  }
  handleClick = e => {
    console.log('click ', e);
    // console.log(this.props.history,'@@@@@@@@@@@@@@@@');
    this.setState({
      activeKey: e.key,
    });
    // this.props.updateActive(e.key);
  };
  render() {
    return (
      <React.Fragment>
        <Menu
          openKeys={['1','2','3','4']}
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.activeKey]}
          mode={this.state.mode}
        >
          {
          this.state.data.map(item=>{
            return (
              <SubMenu key={item.id} title={item.name} icon={<i className={'iconfont '+item.icon_url}></i>}>
                {
                  item.children.map(c=>{
                    return (
                      <Menu.Item key={c.id}>
                        <Link to={c.url}>{c.name}</Link>
                      </Menu.Item>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
        </Menu>
      </React.Fragment>
    )
  }
}

export default withRouter(TheMenu);







          