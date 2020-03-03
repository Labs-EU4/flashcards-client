import React from "react";
import {Menu, Icon, Button} from "antd";
import styles from "./Dashboard.module.css";

const Dashboard = props => {
  return (
    <div className={styles.dashboardLeft}>
      <h1 className={styles.logo}>Logo</h1>
      <h3 className={styles.greeting}>Welcome Username!</h3>
      <div className={styles.menu}>
        <Menu style={{width: 270}} defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]}>
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
        <p>Contact</p>
        <p>About</p>
        <p>legal notice</p>
        <p className={styles.settings}>
          <Icon type="setting" /> Profile Settings
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
