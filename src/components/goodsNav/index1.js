import React from 'react';
import {withRouter} from 'react-router-dom';
import config from '../../assets/js/conf/config';
// class GoodsNav extends React.Component {
//     goPage(url){
//         this.props.history.replace(url);
//     }
//     render() {
//         return (
//             <div>
//                 <ul>
//                     <li onClick={this.goPage.bind(this,'/goods/item')}>商品</li>
//                     <li onClick={this.goPage.bind(this,'/goods/details')}>详情</li>
//                     <li onClick={this.goPage.bind(this,'/goods/review')}>评价</li>
//                 </ul>
//             </div>
//         )
//     }
// }

function GoodsNav(props){
    const goPage=(url)=>{
        props.history.replace(url);
    };
    return (
        <div>
            <ul>
                <li onClick={goPage.bind(null,config.path+'goods/item')}>商品</li>
                <li onClick={goPage.bind(null,config.path+'goods/details')}>详情</li>
                <li onClick={goPage.bind(null,config.path+'goods/review')}>评价</li>
            </ul>
        </div>
    )
}

export default withRouter(GoodsNav);