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
import {Route, Switch, Redirect} from 'react-router-dom';
// import {AuthRoute} from '@/routes/private'

class DefaultLayout extends React.Component{
  render() {
    return (
      <Switch>
        <Suspense fallback={<React.Fragment/>}>
          {
            this.props.routes.map((route, key) => {
              return <Route key={key} path={route.path} render={
                props => (
                  <route.component {...props} routes={route.routes} />
                )
              } />
            })
          }
          <Redirect to='{this.props.routes[0].path}'></Redirect>
        </Suspense>
      </Switch>
    )
  }
}

export default DefaultLayout;