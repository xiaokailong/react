import React from 'react';
import Css from './style.css';

class Confirm extends React.Component{
  constructor() {
    super();
    this.state={
      title:'确认要删除吗？'
    }
  }
  test(e){
    //阻止事件冒泡，放在内部元素上
    e.stopPropagation()
  }
  render() {
    return (
      <div className={Css["my-confirm-mask"]}>
        <div className={Css["my-confirm"]}>
          <div className={Css["my-confirm_title"]}>{this.state.title}</div>
          <div className={Css["my-confirm_btns"]}>
            <div>取消</div>
            <div>确认</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirm;