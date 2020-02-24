import React from 'react';
// import TopNav from '../components/TopNav';


const BasicLayout = ({children}) => {
  return (
    <>
      {/* <TopNav /> */}
      <main>
        {children}
      </main>
    </>
  )
}

export default BasicLayout;