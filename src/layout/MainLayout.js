/*
HashRouter:有#号
BrowserRouter:没有#号
Route：设置路由与组件关联
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
Redirect:路由重定向
*/
import React, {Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {AuthRoute} from '@/routes/private'
import { Layout, Menu, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
// import routers from '@/router'
// import EventBus from '@/services/EventBus'
const { Header, Sider, Content } = Layout;

class MainLayout extends React.Component{
  constructor(props){
    super(props)
    this.state={
      collapsed: false,
    }
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const logoImage = require('@/assets/images/logo.png');
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={logoImage} alt=""/>
            <h1>Fan React Pro</h1>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Spin tip="Loading...">
            </Spin>
            <Switch>
              <Suspense fallback={<React.Fragment/>}>
                { 
                  
                  this.props.routes.map((route, key) => {
                    if(route.auth){
                      return <AuthRoute key={key} path={route.path} component={route.component} />
                    } else {
                      return <Route exact={route.exact} key={key} path={route.path} render={
                        props => (
                          <route.component {...props} routes={route.routes} />
                        )
                      } />
                    }
                  })
                }
                <Redirect to={this.props.routes[0].path}></Redirect>
              </Suspense>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout;