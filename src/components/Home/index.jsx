import { Layout, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import FooterHomePage from './Footer';
import HeaderHomePage from './Header';
import './style.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    if (!user) {
      navigate('/login');
    }
    setIsLoading(false);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
          size='large'
        />
      ) : (
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
      )}
    </div>
  );
};

export default HomePage;
