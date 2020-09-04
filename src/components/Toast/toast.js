import React from 'react';

class Toast extends React.Component{
  constructor(){
    super();
    this.state = {
      txt: 'toast'
    }
  }
  showToast(opt){
    this.setState({
      txt: opt.txt
    })
  }
  render(){
    return (
      <div className="my-toast">{this.state.txt}</div>
    )
  }
}

export default Toast;