### todo List：
#### 1.面包屑  react-router-redux?
#### 2.路由可否用EventBus实现  react-router-redux?
#### 3.表格自适应高度
#### 4.导航数据重复显示的bug
# Fan React Pro

### 前言

> 本人之前一直是做Vue开发，最近一直在学习react，搭建了一套适合做企业后台管理系统的react前端框架，也是边学边做，希望能够与君共勉。

-   [GitHub 地址](https://github.com/xiaokailong/react.git)


### 安装运行

##### 1.克隆项目源码

```js
git clone https://github.com/xiaokailong/react.git;
```

##### 2.npm 安装依赖

```js
npm install
```

##### 3.启动项目

```js
npm run start
```

##### 4.打包项目

```js
npm run build
```

### 依赖模块

<span style="color: rgb(184,49,47);">项目是用 create-react-app 创建的，主要还是列出新加的功能依赖包</span>

<span style="color: rgb(184,49,47);">点击名称可跳转相关网站 😄😄</span>

-   [react](https://facebook.github.io/react/)
-   [react-router](https://react-guide.github.io/react-router-cn/)(<span style="color: rgb(243,121,52);">react 路由，4.x 的版本，如果还使用 3.x 的版本，请切换分支（ps:分支不再维护）</span>)
-   [redux](https://redux.js.org/)(基础用法，但是封装了通用 action 和 reducer，demo 中主要用于权限控制（ps：目前可以用 16.x 的 context api 代替），可以简单了解下)
-   [antd](https://ant.design/index-cn)(<span style="color: rgb(243,121,52);">蚂蚁金服开源的 react ui 组件框架</span>)
-   [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http 请求模块，可用于前端任何场景，很强大 👍</span>)
-   [screenfull](https://github.com/sindresorhus/screenfull.js/)(<span style="color: rgb(243,121,52);">全屏插件</span>)
-   [animate.css](http://daneden.me/animate)(<span style="color: rgb(243,121,52);">css 动画库</span>)
-   [react-loadable](https://github.com/jamiebuilds/react-loadable)(代码拆分，按需加载，预加载，样样都行，具体见其文档，推荐使用)
-   ...

### 功能模块

<span style="color: rgb(184,49,47);">备注：项目只引入了 ant-design 的部分组件，其他的组件 antd 官网有源码，可以直接复制到项目中使用，后续有时间补上全部组件。</span>

<!--more-->

-   首页
    -   完整布局
    -   换肤(全局功能，暂时只实现了顶部导航的换肤，后续加上其他模块)
-   导航菜单
    -   顶部导航(菜单伸缩，全屏功能)
    -   左边菜单(增加滚动条以及适配路由的 active 操作)
-   UI 模块
    -   按钮(antd 组件)
    -   图标(antd 组件并增加彩色表情符)
    -   加载中(antd 组件并增加顶部加载条)
    -   通知提醒框(antd 组件)
    -   标签页(antd 组件)
    -   轮播图(ant 动效组件)
    -   富文本
    -   拖拽
    -   画廊
-   动画
    -   基础动画(animate.css 所有动画)
    -   动画案例
-   表格
    -   基础表格(antd 组件)
    -   高级表格(antd 组件)
    -   异步表格(数据来自掘金酱的接口)
-   表单
    -   基础表单(antd 组件)
-   图表
    -   echarts 图表
    -   recharts 图表
-   页面
    -   登录页面
    -   404 页面

### 代码目录

```js
+-- build/                                  ---打包的文件目录
+-- config/                                 ---npm run eject 后的配置文件目录
+-- node_modules/                           ---npm下载文件目录
+-- public/
|   --- index.html							---首页入口html文件
|   --- npm.json							---echarts测试数据
|   --- weibo.json							---echarts测试数据
+-- src/                                    ---核心代码目录
|   +-- axios                               ---http请求存放目录
|   |    --- index.js
|   +-- components                          ---各式各样的组件存放目录
|   |    +-- animation                      ---动画组件
|   |    |    --- ...
|   |    +-- charts                         ---图表组件
|   |    |    --- ...
|   |    +-- dashboard                      ---首页组件
|   |    |    --- ...
|   |    +-- forms                          ---表单组件
|   |    |    --- ...
|   |    +-- pages                          ---页面组件
|   |    |    --- ...
|   |    +-- tables                         ---表格组件
|   |    |    --- ...
|   |    +-- ui                             ---ui组件
|   |    |    --- ...
|   |    --- BreadcrumbCustom.jsx           ---面包屑组件
|   |    --- HeaderCustom.jsx               ---顶部导航组件
|   |    --- Page.jsx                       ---页面容器
|   |    --- SiderCustom.jsx                ---左边菜单组件
|   +-- style                               ---项目的样式存放目录，主要采用less编写
|   +-- utils                               ---工具文件存放目录
|   --- App.js                              ---组件入口文件
|   --- index.js                            ---项目的整体js入口文件，包括路由配置等
--- .env                                    ---启动项目自定义端口配置文件
--- .eslintrc                               ---自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json
```

### License

MIT

### 结尾

该项目会不定时更新，后续时间会添加更多的模块

欢迎和感谢大家 PR~~👏👏

若有问题，可加 QQ540349688与我交流
如果对你有帮助，给个 star 哟~~❤️❤️❤️❤️
