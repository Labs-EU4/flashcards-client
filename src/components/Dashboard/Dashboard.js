import React, {useState} from "react";
import {Menu, Icon, Button} from "antd";
import styles from "./Dashboard.module.css";

const Dashboard = props => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  if (collapsed === true) {
    return (
      <div className={styles.toggleIcon}>
        <Icon
          type="menu"
          style={{fontSize: "30px"}}
          theme="outlined"
          onClick={() => toggle()}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.dashboardLeft}>
        <div className={styles.toggleIcon}>
          <Icon
            type="menu"
            style={{fontSize: "30px"}}
            theme="outlined"
            onClick={() => toggle()}
          />
        </div>
        <h1 className={styles.logo}>Logo</h1>
        <h3 className={styles.greeting}>Welcome Username!</h3>
        <div className={styles.menu}>
          <Menu
            style={{width: 270}}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
          >
            <Menu.Item key="1">
              <Icon type="home" />
              Home
            </Menu.Item>

            <Menu.Item key="2">
              {" "}
              <Icon type="block" />
              Deck Library
            </Menu.Item>
            <Menu.Item key="3">
              {" "}
              <Icon type="global" />
              Discover Decks
            </Menu.Item>
          </Menu>
        </div>
        <Button type="primary" className={styles.logoutButton}>
          Logout
        </Button>
        <footer className={styles.footer}>
          <p>
            <Icon type="setting" /> Profile Settings
          </p>
        </footer>
      </div>
    );
  }
};

export default Dashboard;
