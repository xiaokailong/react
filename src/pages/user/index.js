import React from "react";
import {connect} from 'react-redux';
import config from '../../assets/js/conf/config'
import actions from '../../store/actions';

class UserCenter extends React.Component {
  constructor(){
    super()
    this.state={}
  }
  outLogin(){
    this.props.dispatch((dispatch, getState)=>{
      // dispatch({
      //   type: 'OUTLOGIN',
      // })
      dispatch(actions.user.outLogin())
    })
    this.props.history.replace(config.path+"login");
  }
  render() {
    return (
      <div>
        <div>欢迎：{this.props.state.user.username}</div>
        <button type="button" onClick={this.outLogin.bind(this)}>安全退出</button>
      </div>
    )
  }
}

export default connect((state)=>({state}))(UserCenter);
