import React from 'react';

class NewsIndex extends React.Component{
  render(){
    return (
      <div>
        <h3>新闻页用来测试路由跳转</h3>
        <ul>
          <li onClick={()=>{this.props.history.push("/news/details?id=1&title=新闻详情1")}}>测试EventBus的路由跳转1</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=2&title=新闻详情2")}}>测试EventBus的路由跳转2</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=3&title=新闻详情3")}}>测试EventBus的路由跳转3</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=4&title=新闻详情4")}}>测试EventBus的路由跳转4</li>
        </ul>
      </div>
    )
  }
}

export default NewsIndex;
