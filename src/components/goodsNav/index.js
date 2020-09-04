import React from 'react';
import { withRouter } from 'react-router-dom'
import config from '../../assets/js/conf/config';

class GoodsNav extends React.Component{
  goPage(url){
    this.props.history.replace(url)
  }
	render(){
		return (
			<React.Fragment>
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