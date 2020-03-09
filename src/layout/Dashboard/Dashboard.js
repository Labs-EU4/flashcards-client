import React, {useState} from "react";
import {Link} from "react-router-dom";
import styles from "./Dashboard.module.css";

import {Layout, Menu, Icon, Button} from "antd";

const {Sider, Content} = Layout;

const Dashboard = props => {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  function logout() {
    localStorage.clear();
  }

  return (
    <div>
      <Layout className={styles.dashboard}>
        <div
          className={
            state.collapsed ? styles.dashboardLeftCollapsed : styles.dashboardLeft
          }
        >
          <Sider
            className={state.collapsed ? styles.siderCollapsed : styles.sider}
            trigger={null}
            collapsible
            collapsed={state.collapsed}
          >
            <div
              className={
                state.collapsed ? styles.logoAndCollapseCollapsed : styles.logoAndCollapse
              }
            >
              <Link to="/">
                <img
                  src="https://i.imgur.com/tuS7kwh.png"
                  alt="logo"
                  className={state.collapsed ? styles.logoCollapsed : styles.logo}
                />
              </Link>
              <Icon
                className="trigger"
                type={state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={toggle}
                style={{fontSize: "24px"}}
              />
            </div>
            <h3
              className={styles.greeting}
              style={state.collapsed ? {display: "none"} : null}
            >
              Welcome Username!
            </h3>

            <Menu
              className={state.collapsed ? styles.menuCollapsed : styles.menu}
              theme="light"
              mode="inline"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1">
                <Icon type="home" />
                <span>Home</span>
              </Menu.Item>
              <Menu.Item key="2">
                {" "}
                <Icon type="block" />
                <span>Deck Library</span>
              </Menu.Item>
              <Menu.Item key="3">
                {" "}
                <Icon type="global" />
                <span>Discover Decks</span>
              </Menu.Item>
            </Menu>
            <footer
              className={styles.footer}
              style={state.collapsed ? {display: "none"} : null}
            >
              <Link to="/login">
                <Button
                  onClick={() => logout()}
                  type="primary"
                  className={styles.logoutButton}
                >
                  Logout
                </Button>
              </Link>
              <p>
                <Icon type="setting" /> Profile Settings
              </p>
            </footer>
          </Sider>
        </div>
        <Layout>
          <Content
            style={{
              background: "#fff",
              width: "100%",
            }}
          >
            {props.child}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;
