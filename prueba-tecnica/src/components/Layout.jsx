import React from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

// Layout component
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout;