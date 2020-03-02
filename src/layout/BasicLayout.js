import React from "react";
import {Layout, Menu, Icon} from "antd";
import {UserAddOutline} from "@ant-design/icons";

const {Header, Content, Footer, Sider} = Layout;

const BasicLayout = props => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item key="1">
            <Icon component={UserAddOutline} />
            <span className="nav-text">nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            {/* {VideoCameraOutline} */}
            <span className="nav-text">nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            {/* {UploadOutline} */}
            <span className="nav-text">nav 3</span>
          </Menu.Item>
          <Menu.Item key="4">
            {/* {UserOutline} */}
            <span className="nav-text">nav 4</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{padding: 0}} />
        <Content style={{margin: "24px 16px 0"}}>
          <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
            content
          </div>
        </Content>
        <Footer style={{textAlign: "center"}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
