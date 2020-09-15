import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom'
import Css from './layout.css'

import { Menu, Dropdown, Avatar, Tooltip } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link to="/ucenter/user">
        <i className="iconfont icon-gerenbangong"></i> 个人中心
      </Link>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/ucenter/config">
        <i className="iconfont icon-shezhi"></i> 个人设置
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <Link to="/login">
        <i className="iconfont icon-tuichu"></i> 退出登录
      </Link>
    </Menu.Item>
  </Menu>
);


class TheHeader extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
  }
  render() {
    const avatarImage = require('@/assets/images/avatar.jpg');
    return (
      <div className={Css['site-header']}>
        <div className={Css['site-header-right']}>
          <span className={Css['site-header-right-action']}>
            <Tooltip placement="bottom" title="帮助中心">
              <i className={Css['action-link'] + ' iconfont icon-bangzhu'}></i>
            </Tooltip>
          </span>
          <span className={Css['site-header-right-action']}>
            <Tooltip placement="bottom" title="消息通知">
              <i className={Css['action-link'] + ' iconfont icon-lingdang'}></i>
            </Tooltip>
          </span>
          <span className={Css['site-header-right-action']}>
            <Dropdown overlay={menu} placement="bottomRight">
              <div className={Css["action-link"]} onClick={e => e.preventDefault()}>
                <Avatar className={Css['header-avatar']} size={24} src={avatarImage} />
                Gabriel
              </div>
            </Dropdown>
          </span>
        </div>
      </div>
    )
  }
}

export default withRouter(TheHeader);







          