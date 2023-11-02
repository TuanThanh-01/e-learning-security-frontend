import React, { useState } from 'react';
import {
  UserOutlined,
  UnorderedListOutlined,
  CloudOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu, theme } from 'antd';
import logoPtit from '../../assets/logo.png';
import CategoryLesson from './CategoryLesson';
import Lesson from './Lesson';
import Post from './Post';
import Progress from './Progress';
import Question from './Question';
import Quiz from './Quiz';
import Score from './Score';
import Topic from './Topic';
import User from './User';
import ChallengeCTF from './ChallengeCTF';
import getCurrentDateFormatVietnamese from '../../utils/GetCurrentDateFormatVietnamese';
import './style.css';

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items = [
  getItem('Category Lesson', '1', <UnorderedListOutlined />),
  getItem('Lesson', '2', <UnorderedListOutlined />),
  getItem('Post', '3', <UnorderedListOutlined />),
  getItem('Progress', '4', <UnorderedListOutlined />),
  getItem('Question', '5', <UnorderedListOutlined />),
  getItem('Quiz', '6', <UnorderedListOutlined />),
  getItem('Score', '7', <UnorderedListOutlined />),
  getItem('Topic Post', '8', <UnorderedListOutlined />),
  getItem('User', '9', <UnorderedListOutlined />),
  getItem('ChallengeCTF', 10, <UnorderedListOutlined />),
];

const AdminHomePage = () => {
  const [itemSelect, setItemSelect] = useState('category-lesson');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickMenu = (e) => {
    if (e.key === 'category-lesson') {
      setItemSelect('category-lesson');
    }
    if (e.key === 'lesson') {
      setItemSelect('lesson');
    }
    if (e.key === 'post') {
      setItemSelect('post');
    }
    if (e.key === 'progress') {
      setItemSelect('progress');
    }
    if (e.key === 'question') {
      setItemSelect('question');
    }
    if (e.key === 'quiz') {
      setItemSelect('quiz');
    }
    if (e.key === 'score') {
      setItemSelect('score');
    }
    if (e.key === 'topic') {
      setItemSelect('topic');
    }
    if (e.key === 'user') {
      setItemSelect('user');
    }
    if (e.key === 'challenge-ctf') {
      setItemSelect('challenge-ctf');
    }
  };

  return (
    <Layout>
      <Sider breakpoint='lg' collapsedWidth='0'>
        <div className='p-1'>
          <img
            src={logoPtit}
            style={{
              width: '20%',
            }}
            className='mt-2 rounded'
          />
          <p
            className='d-inline ml-2 font-weight-bold'
            style={{ color: '#fff', lineHeight: '32px' }}
          >
            PTIT Learning InfoSec
          </p>
        </div>
        <Menu
          className='mt-2'
          style={{ gap: 3 }}
          theme='dark'
          onClick={handleClickMenu}
          defaultSelectedKeys={['category-lesson']}
        >
          <Menu.Item key='category-lesson' icon={<UnorderedListOutlined />}>
            Category Lesson
          </Menu.Item>
          <Menu.Item key='challenge-ctf' icon={<UnorderedListOutlined />}>
            Challenge CTF
          </Menu.Item>
          <Menu.Item key='lesson' icon={<UnorderedListOutlined />}>
            Lesson
          </Menu.Item>
          <Menu.Item key='post' icon={<UnorderedListOutlined />}>
            Post
          </Menu.Item>{' '}
          <Menu.Item key='progress' icon={<UnorderedListOutlined />}>
            Progress
          </Menu.Item>
          <Menu.Item key='question' icon={<UnorderedListOutlined />}>
            Question
          </Menu.Item>
          <Menu.Item key='quiz' icon={<UnorderedListOutlined />}>
            Quiz
          </Menu.Item>
          <Menu.Item key='score' icon={<UnorderedListOutlined />}>
            Score
          </Menu.Item>
          <Menu.Item key='topic' icon={<UnorderedListOutlined />}>
            Topic
          </Menu.Item>
          <Menu.Item key='user' icon={<UnorderedListOutlined />}>
            User
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div className='ml-4' style={{ display: 'flex' }}>
            <CloudOutlined
              style={{ fontSize: '2rem', color: '#AEDEFC' }}
              className='mr-3'
            />
            <p style={{ fontWeight: '700' }}>
              {getCurrentDateFormatVietnamese()}
            </p>
          </div>
          <div className='mr-4'>
            <b className='mr-3'>Xin chào, Administrator</b>
            <Avatar size='large' icon={<UserOutlined />} className='' />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            className='main-container'
            style={{
              padding: 24,
              height: '100%',
              background: colorBgContainer,
              overflowY: 'auto',
            }}
          >
            {itemSelect === 'category-lesson' ? <CategoryLesson /> : <></>}
            {itemSelect === 'challenge-ctf' ? <ChallengeCTF /> : <></>}
            {itemSelect === 'lesson' ? <Lesson /> : <></>}
            {itemSelect === 'post' ? <Post /> : <></>}
            {itemSelect === 'progress' ? <Progress /> : <></>}
            {itemSelect === 'question' ? <Question /> : <></>}
            {itemSelect === 'quiz' ? <Quiz /> : <></>}
            {itemSelect === 'score' ? <Score /> : <></>}
            {itemSelect === 'topic' ? <Topic /> : <></>}
            {itemSelect === 'user' ? <User /> : <></>}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Học Viện Công Nghệ Bưu Chính Viễn Thông &copy; 2023 Produced by PTIT
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminHomePage;
