import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import config from '../../assets/js/conf/config';
import { Breadcrumb } from 'antd';

class GoodsNav extends React.Component{
  goPage(url){
    this.props.history.replace(url)
  }
	render(){
    const { location } = this.props;
    console.log(location,'!!!');
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{url}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);
    console.log(breadcrumbItems,'@@@@@@@@@@');
		return (
			<React.Fragment>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        <ul>
          <li onClick={this.goPage.bind(this, config.path + 'goods/item')}>商品</li>
          <li onClick={this.goPage.bind(this, config.path + 'goods/detail')}>详情</li>
          <li onClick={this.goPage.bind(this, config.path + 'goods/review')}>评价</li>
        </ul>
			</React.Fragment>
		)
	}
}

export default withRouter(GoodsNav);