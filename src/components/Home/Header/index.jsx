import { Avatar, Tabs } from 'antd';
import { Header } from 'antd/es/layout/layout';
import logoPtit from '../../../assets/logo.png';
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { Link, useNavigate } from 'react-router-dom';

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
      label: 'Thảo luận',
      key: 'discuss',
    },
  ];
  return (
    <Header
      className='shadow-sm'
      style={{
        padding: 0,
        display: 'flex',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div className='ml-3 d-flex justify-content-center mr-5'>
          <img
            src={logoPtit}
            className='mr-2 mt-2'
            style={{ height: '2.5rem' }}
          />
          <b className='text-center' style={{ fontSize: '1.1rem' }}>
            PTIT Learning InfoSec
          </b>
        </div>
      </div>
      <Tabs
        items={items}
        mode='horizontal'
        activeKey={currentItem}
        className='mt-2'
        size='large'
        onChange={handleOnChangePage}
        tabBarStyle={{
          fontWeight: 600,
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
