import React from "react";
import {Layout} from "antd";
const {Header, Sider, Content, Footer} = Layout;

export default function PlayModeLayout(props) {
  const {children, footer, header} = props;
  return (
    <Layout>
      <Header>{header}</Header>
      <Content>{children}</Content>
      <Footer>{footer}</Footer>
    </Layout>
  );
}
