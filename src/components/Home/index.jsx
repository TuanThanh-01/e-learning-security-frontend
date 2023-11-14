import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterHomePage from './Footer';
import HeaderHomePage from './Header';
import './style.css';

const HomePage = () => {
  return (
    <Layout style={{ backgroundColor: '#F5F5F5' }}>
      <HeaderHomePage />
      <div
        className='container-homePage'
        style={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </div>
      <FooterHomePage />
    </Layout>
  );
};

export default HomePage;
