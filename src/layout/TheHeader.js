import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import actions from "@/store/actions";
import Css from './layout.css';

import { Menu, Dropdown, Avatar, Tooltip, Badge } from 'antd';



class TheHeader extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
  }
  outLogin() {
    this.props.dispatch((dispatch, getState) => {
      dispatch(actions.user.logout());
    });
    this.props.history.replace("/login");
  }
  render() {
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
          <div onClick={this.outLogin.bind(this)}>
            <i className="iconfont icon-tuichu"></i> 退出登录
          </div>
        </Menu.Item>
      </Menu>
    );
    const avatarImage = require('@/assets/images/avatar.jpg');
    return (
      <div className={Css['site-header']}>
        <div className={Css['site-header-right']}>
          <Tooltip placement="bottom" title="帮助中心">
            <span className={Css['site-header-right-action']}>
              <i className={Css['action-link'] + ' iconfont icon-bangzhu'}></i>
            </span>
          </Tooltip>
          <Tooltip placement="bottom" title="消息通知">
            <span className={Css['site-header-right-action']}>
              <Badge size="small" count={5} offset={[-10, 0]}>
                <i className={Css['action-link'] + ' iconfont icon-lingdang'}></i>
              </Badge>
            </span>
          </Tooltip>
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

export default withRouter(connect((state) => ({ state }))(TheHeader));







          