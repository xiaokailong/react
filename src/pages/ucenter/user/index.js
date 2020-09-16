import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import config from "../../../assets/js/conf/config";
import actions from "../../../store/actions";

function UcenterUser(props) {
  const { dispatch, history, state } = props;
  const [title, setTtile] = useState('我是title');
  const changeTitle = (val) => {
    setTtile(val);
  }
  useEffect(()=>{
    console.log(title,'@@@useEffect拿到最新的值');
    return () => {
      console.log("我要离开了，相当于componentWillUnmount");
    }
  },[title])  // title变化才执行
  const outLogin = () => {
    dispatch((dispatch, getState) => {
      dispatch(actions.user.logout());
    });
    history.replace(config.path + "login");
  }
  return (
    <div>
      <div>hooks标题：{title}</div>
      <button type="button" onClick={()=>{changeTitle('把我改成了hooks的title了')}}>
        修改标题
      </button>
      <div>token：{state.user.token}</div>
      <button type="button" onClick={outLogin.bind(this)}>
        安全退出
      </button>
    </div>
  )
}

export default connect((state) => ({ state }))(UcenterUser);
