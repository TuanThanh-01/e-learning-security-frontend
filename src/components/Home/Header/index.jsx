import { UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Dropdown, Menu, Tabs } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoPtit from '../../../assets/logo.png';
import './style.css';
import axios from 'axios';

const HeaderHomePage = () => {
  const location = useLocation();
  const [currentItem, setCurrentItem] = useState(
    location.pathname.substring(1)
  );
  const navigate = useNavigate();

  const handleOnChangePage = (key) => {
    setCurrentItem(key);
    navigate(`/${key}`);
  };

  const removeToken = async () => {
    const user = JSON.parse(localStorage.getItem('user_data'));

    await axios.get('http://localhost:8082/api/v1/auth/logout', {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });
  };

  const handleOnClick = () => {
    removeToken();
    localStorage.removeItem('user_data');
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={handleOnClick}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const items = [
    {
      label: 'Bài học',
      key: 'lesson',
    },
    {
      label: 'Bài Trắc Nghiệm',
      key: 'quiz',
    },
    {
      label: 'Thử thách CTF',
      key: 'challenge-ctf',
    },
    {
      label: 'Bảng xếp hạng',
      key: 'ranking',
    },
  ];
  return (
    <Header
      className='shadow-sm'
      style={{
        padding: 0,
        display: 'flex',
        backgroundColor: '#ad171c',
        justifyContent: 'space-between',
        color: '#fff',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div className='ml-3 d-flex justify-content-center mr-5'>
          <img
            src={logoPtit}
            className='mr-2 mt-2'
            style={{
              height: '2.5rem',
              backgroundColor: '#fff',
              borderRadius: '50%',
              padding: '2px',
            }}
          />
          <b className='text-center' style={{ fontSize: '1.1rem' }}>
            PTIT Learning InfoSec
          </b>
        </div>
      </div>
      <ConfigProvider></ConfigProvider>
      <Tabs
        items={items}
        mode='horizontal'
        activeKey={currentItem}
        className='mt-2'
        size='large'
        onChange={handleOnChangePage}
        style={{
          color: '#fff !important',
        }}
        tabBarStyle={{
          fontWeight: 600,
          color: '#fff !important',
        }}
      />
      <Dropdown overlay={menu}>
        <div className='mr-4'>
          <b className='mr-3'>Xin chào, Nguyễn Tuấn Thành</b>
          <Avatar size='large' icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </Header>
  );
};

export default HeaderHomePage;
