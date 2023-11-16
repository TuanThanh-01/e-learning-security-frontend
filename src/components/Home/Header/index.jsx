import { Avatar, ConfigProvider, Tabs } from 'antd';
import { Header } from 'antd/es/layout/layout';
import logoPtit from '../../../assets/logo.png';
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

const HeaderHomePage = () => {
  const [currentItem, setCurrentItem] = useState('lesson');
  const navigate = useNavigate();

  const handleOnChangePage = (key) => {
    setCurrentItem(key);
    navigate(`/${key}`);
  };
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
      <div className='mr-4'>
        <b className='mr-3'>Xin chào, Nguyễn Tuấn Thành</b>
        <Avatar size='large' icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default HeaderHomePage;
