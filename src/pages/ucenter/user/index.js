import React from "react";
import {connect} from 'react-redux';
import config from '../../../assets/js/conf/config'
import actions from '../../../store/actions';

class UcenterUser extends React.Component {
  constructor(){
    super()
    this.state={}
  }
  outLogin(){
    this.props.dispatch((dispatch, getState)=>{
      dispatch(actions.user.logout())
    })
    this.props.history.replace(config.path+"login");
  }
  render() {
    return (
      <div>
        <div>用户名：{this.props.state.user.username}</div>
        <div>token：{this.props.state.user.token}</div>
        <button type="button" onClick={this.outLogin.bind(this)}>安全退出</button>
      </div>
    )
  }
}

export default connect((state)=>({state}))(UcenterUser);
