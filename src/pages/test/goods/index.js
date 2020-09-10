import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import GoodsNav from '@/components/goodsNav';
import { withRouter } from "react-router-dom"

class GoodsIndex extends React.Component{
  render(){
    console.log(this.props,'!!!!!!!!!!');
    return (
      <div>
        <h3>商品页用来测试父子嵌套路由</h3>
        <button type="button" onClick={this.props.history.go.bind(this,-1)}>返回</button>
        <GoodsNav></GoodsNav><br /><br /><br /><br />
        <div>
          <Switch>
            <Suspense fallback={<React.Fragment/>}>
              {
                this.props.routes.map((route, key) => {
                  return <Route exact key={key} path={route.path} component={route.component} />
                })
              }
              {/* <Redirect to={this.props.routes[0].path}></Redirect> */}
            </Suspense>
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(GoodsIndex);