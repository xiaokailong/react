import React from 'react';
import { Layout } from 'antd';
import TheMenu from './TheMenu'
import TheHeader from './TheHeader'
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
// } from '@ant-design/icons';
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
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="site-sider">
          <div className="logo">
            <img src={logoImage} alt=""/>
            <h1>Fan React Pro</h1>
          </div>
          <TheMenu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <TheHeader />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.content}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout;