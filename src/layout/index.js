/*
HashRouter:有#号
BrowserRouter:没有#号
Route：设置路由与组件关联
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
Redirect:路由重定向
*/
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import DefaultLayout from './DefaultLayout'
import MainLayout from './MainLayout'
// import routers from '@/router'
// const whiteList = ['/login', '/user']
class Layout extends React.Component{
  render() {
    return (
      <Router>
        <MainLayout content={<DefaultLayout />} />
        {/* <DefaultLayout /> */}
      </Router>
    )
  }
}

export default Layout;