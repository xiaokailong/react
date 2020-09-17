import React, {lazy, Suspense} from "react";
import ReactDom from "react-dom";
import "./App.css";
import MyButton from "./components/MyButton";
import Toast from "./components/Toast"
import Confirm from "./components/Confirm/confirm.js"
// import HeaderComponent from "./components/HeaderComponent";
// 组件懒加载
const HeaderComponent = lazy(()=>import("./components/HeaderComponent"));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bShow: true,
      student: [
        { name: "张三", age: 18 },
        { name: "李四", age: 28 },
        { name: "王五", age: 38 },
      ],
      headerShow: false,
      name: ''
    };
  }
  componentDidMount() {
    let dom = ReactDom.findDOMNode(document.getElementById("ab"));
    console.log(dom.innerHTML);
  }
  changeBoxShow() {
    this.setState({ bShow: !this.state.bShow }, () => {
      console.log(11);
    });
  }
  mouseMove(e, arg) {
    console.log(e.pageX, arg);
  }
  getChilerenData(val,val2){
    console.log(val,val2);
  }
  submitBtn (val) {
    console.log(val,'!#@!@$@');
  }
  showHeaderComp(){
    this.setState({
      showHeaderComp: true,
    })
  }
  nameLogin(){
    if(this.state.name.match(/^\s*$/)){
      Toast({
        txt: '请输入用户名',
        duration: 2000,
        onClose: ()=> {
          console.log('toast已关闭!');
        }
      })
    }
  }
  render() {
    let name = "11124124124";
    let htmlContent = "<span style='color: blue;'>我是红色的字</span>";
    return (
      <div className="App">
        <MyButton style={{width: "200px", fontSize: "20px"}} className="redButton" onClick={this.submitBtn}>提交</MyButton>
        <button type="button" onClick={this.showHeaderComp.bind(this)}>显示/隐藏Header组件</button>
        {
          this.state.showHeaderComp && 
          <Suspense fallback={<></>}>
            <HeaderComponent title="首页1" saveClick={(val)=>this.getChilerenData(val,'abced')} />
          </Suspense>
        }
        {/* jsx里面的注释 */}
        <div id="ab" style={{ fontSize: "30px" }}>
          {name}
        </div>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        <button type="button" onClick={this.changeBoxShow.bind(this)}>
          显示/隐藏
        </button>
        {this.state.bShow && (
          <div
            className="box"
            onMouseMove={(e) => {
              this.mouseMove(e, "move");
            }}
          ></div>
        )}
        <ul>
          {this.state.student.map((item, index) => {
            return (
              <li key={index}>
                {index}:{item.name}
                {item.age}
              </li>
            );
          })}
        </ul>
        {/* <Confirm /> */}
        <div>
          请输入用户名：<input type="text" value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
          <button type="button" onClick={this.nameLogin.bind(this)}>登录</button>
        </div>
      </div>
    );
  }
}

export default App;
