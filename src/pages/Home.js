import React from 'react';
import BasicLayout from '../layout/BasicLayout';
import { Button } from 'antd';

const Home = () => {
  return (
    <BasicLayout>
      <h1>This is Home!</h1>
      <Button type="primary">Button</Button>
    </BasicLayout>
  )
}

export default Home;