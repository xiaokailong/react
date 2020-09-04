import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

class HeaderComponet extends Component{
  render() {
    return (
      <div>
        {this.props.title}
        <button type="button" className="redButton" onClick={()=>this.props.saveClick('这是子组件传递过来的值')}>点击向父组件传值</button>
      </div>
    )
  }
}
// 类型检测
HeaderComponet.propTypes = {
  title: PropTypes.string.isRequired,
}
//默认值
HeaderComponet.defaultProps = {
  title: '默认导航'
}

export default HeaderComponet;