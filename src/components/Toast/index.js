import React from "react";
import ReactDom from "react-dom";
import Toast from "./toast.js";

export default function (opt) {
  // console.log(opt);
  // 创建div元素
  let div = document.createElement("div");
  let duration = opt.duration || 2000;
  document.body.appendChild(div);
  // 将Toast和div挂载到render
  let init = ReactDom.render(<Toast />, div);
  // 执行组件上的方法，把值传进去
  init.showToast(opt);
  setTimeout(() => {
    div.querySelector(".my-toast").style.animation="hideToast 0.3s forwards";
    setTimeout(()=>{
      document.body.removeChild(div);
    },500)
    if(opt.onClose) {
      opt.onClose();
    }
  },duration);
}
