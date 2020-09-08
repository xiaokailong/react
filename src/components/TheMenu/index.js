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
    // const {datas} = await getMenuList()
    // const data = jsonTree(datas,{pid: 'parent_id'})
    const data = jsonTree(MenuMockData,{pid: 'parent_id'})
    // this.setState({data})
    this.setState((state)=>{
      return {
        data
      }
    })
  }
  handleClick = e => {
    // console.log('click ', e);
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
          theme={this.state.theme}
          onClick={this.handleClick}
          selectedKeys={[this.state.activeKey]}
          mode={this.state.mode}
        >
          {
          this.state.data.map(item=>{
            return (
              <SubMenu key={item.id} title={item.name}>
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







          