import React from 'react';


class NewsIndex extends React.Component{
  render(){
    return (
      <div>
        <ul>
          <li onClick={()=>{this.props.history.push("/news/details?id=1&title=新闻详情1")}}>新闻标题1</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=2&title=新闻详情2")}}>新闻标题2</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=3&title=新闻详情3")}}>新闻标题3</li>
          <li onClick={()=>{this.props.history.push("/news/details?id=4&title=新闻详情4")}}>新闻标题4</li>
        </ul>
      </div>
    )
  }
}

export default NewsIndex;
