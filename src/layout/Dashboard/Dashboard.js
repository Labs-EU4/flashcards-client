import React, {useState} from "react";
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

  return (
    <div>
      <Layout>
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
              className={styles.logoAndCollapse}
              style={state.collapsed ? {flexDirection: "column"} : null}
            >
              <h1 className={styles.logo}>Logo</h1>
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
            <div>
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
            </div>
            <footer
              className={styles.footer}
              style={state.collapsed ? {display: "none"} : null}
            >
              <Button type="primary" className={styles.logoutButton}>
                Logout
              </Button>
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
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;

// import {Menu, Icon, Button} from "antd";
// import styles from "./Dashboard.module.css";

// const Dashboard = props => {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggle = () => {
//     setCollapsed(!collapsed);
//   };

//   if (collapsed === true) {
//     return (
//       <>
//         <div className={styles.toggleIcon}>
//           <Icon
//             type="menu"
//             style={{fontSize: "30px"}}
//             theme="outlined"
//             onClick={() => toggle()}
//           />
//         </div>

//         <div className={styles.dashboardRight}>{props.children}</div>
//       </>
//     );
//   } else {
//     return (
//       <div className={styles.dashboard}>
//         <div className={styles.dashboardLeft}>
//           <div className={styles.toggleIcon}>
//             <Icon
//               type="menu"
//               style={{fontSize: "30px"}}
//               theme="outlined"
//               onClick={() => toggle()}
//             />
//           </div>
//           <h1 className={styles.logo}>Logo</h1>
//           <h3 className={styles.greeting}>Welcome Username!</h3>
//           <div className={styles.menuContainer}>
//             <Menu
//               className={styles.menu}
//               defaultSelectedKeys={["1"]}
//               defaultOpenKeys={["sub1"]}
//             >
//               <Menu.Item key="1">
//                 <Icon type="home" />
//                 Home
//               </Menu.Item>

//               <Menu.Item key="2">
//                 {" "}
//                 <Icon type="block" />
//                 Deck Library
//               </Menu.Item>
//               <Menu.Item key="3">
//                 {" "}
//                 <Icon type="global" />
//                 Discover Decks
//               </Menu.Item>
//             </Menu>
//           </div>
//           <Button type="primary" className={styles.logoutButton}>
//             Logout
//           </Button>
//           <footer className={styles.footer}>
//             <p>
//               <Icon type="setting" /> Profile Settings
//             </p>
//           </footer>
//         </div>
//         <div className={styles.dashboardRight}>{props.children}</div>
//       </div>
//     );
//   }
// };

// export default Dashboard;
