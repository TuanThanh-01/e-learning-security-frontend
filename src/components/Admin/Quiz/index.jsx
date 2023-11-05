import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, List, Row, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const handleCreateQuiz = () => {};

  const data = [
    {
      id: 1,
      title: 'Title 1',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 2,
      title: 'Title 2',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 3,
      title: 'Title 3',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 4,
      title: 'Title 4',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 5,
      title: 'Title 5',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 6,
      title: 'Title 6',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 7,
      title: 'Title 7',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 8,
      title: 'Title 8',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 9,
      title: 'Title 9',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 10,
      title: 'Title 10',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 11,
      title: 'Title 11',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
    {
      id: 12,
      title: 'Title 12',
      description: 'We supply a series of design principles',
      imageCover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    },
  ];

  return (
    <div style={{ height: '100vh' }}>
      {isLoading ? (
        <Spin
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          size='large'
        />
      ) : (
        <div>
          <div
            className='mb-5'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Search
              placeholder='Nhập tên bài trắc nghiệm'
              allowClear
              style={{ width: '20rem' }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />

            <div>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170', width: '8rem' }}
                onClick={handleCreateQuiz}
              >
                Thêm mới
              </Button>
            </div>
          </div>
          <List
            itemLayout='vertical'
            size='large'
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            pagination={{
              pageSize: 6,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.title} itemID={item.id}>
                <Card
                  cover={<img src={item.imageCover} />}
                  actions={[
                    <Button
                      type='primary'
                      icon={<EditOutlined key='edit' />}
                    />,
                    <Button danger icon={<DeleteOutlined key='delete' />} />,
                  ]}
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
