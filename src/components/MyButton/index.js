import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Css from './style.css';

class Mybutton extends Component{
  render() {
    return (
      <React.Fragment>
        <button className={Css["my-button"]+" "+this.props.className} style={this.props.style} onClick={(e)=>this.props.onClick(e,'asdfasdfasdfasdf')}>{this.props.children}</button>
      </React.Fragment>
    )
  }
}
// 类型检测
Mybutton.propTypes = {
  title: PropTypes.string.isRequired,
}
//默认值
Mybutton.defaultProps = {
  title: '默认导航'
}

export default Mybutton;