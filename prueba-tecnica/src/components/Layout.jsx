import React from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

// Componente Layout para separar Main, Header y Footer del sitio Web
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