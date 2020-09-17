import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthRoute } from "@/utils/private";
import routers from "@/router";
import EventBus from "@/services/EventBus";
import { Layout } from "antd";
import TheMenu from "./TheMenu";
import TheHeader from "./TheHeader";
const { Header, Sider, Content } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  componentDidMount() {
    this.isLogin();
  }
  isLogin = () => {
    if (!Boolean(sessionStorage["token"])) {
      this.props.history.push("/login");
    }
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const logoImage = require("@/assets/images/logo.png");
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          className="site-sider"
        >
          <div className="logo">
            <img src={logoImage} alt="" />
            <h1>Fan React Pro</h1>
          </div>
          <TheMenu />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <TheHeader />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
              {
                routers.map((route, key) => {
                  if (route.auth) {
                    return (
                      <AuthRoute
                        key={key}
                        exact={route.exact}
                        path={route.path}
                        title={route.title}
                        component={route.component}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={key}
                        exact={route.exact}
                        path={route.path}
                        render={(props) => {
                          EventBus.emit("setTitle", route.title);
                          return (
                            <route.component {...props} routes={route.routes} />
                          );
                        }}
                      />
                    );
                  }
                }
              )}
              <Redirect to='/404' />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
