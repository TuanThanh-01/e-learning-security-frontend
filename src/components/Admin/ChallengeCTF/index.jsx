import {
  BulbOutlined,
  CheckOutlined,
  FlagOutlined,
  FireOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Button, Col, List, Row, Spin, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react';
import CollectionCreateForm from './collectionCreateForm';

const ChallengeCTF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [challengeCTFData, setChallengeCTFData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const handleCreateChallenge = () => {
    setItem(null);
    setOpenModal(true);
  };

  const onCreate = () => {};

  const data = [
    {
      id: 1,
      title: 'Title 1',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      level: 'easy',
      tag: 'web',
      hint: 'A basic card containing a title, content and an extra corner content. ',
      flag: 'randomFlag',
      totalSolve: 4,
      point: 30,
      totalSolve: 15,
      createdAt: '10/10/2023',
      updatedAt: '12/10/2023',
    },
    {
      id: 1,
      title: 'Title 1',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      level: 'medium',
      tag: 'web',
      hint: 'A basic card containing a title, content and an extra corner content.',
      flag: 'randomFlag',
      point: 30,
      totalSolve: 15,
      totalSolve: 4,
      createdAt: '10/10/2023',
      updatedAt: '12/10/2023',
    },
    {
      id: 1,
      title: 'Title 1',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently. ',
      level: 'hard',
      tag: 'web',
      hint: 'A basic card containing a title, content and an extra corner content. ',
      flag: 'randomFlag',
      point: 30,
      totalSolve: 4,
      totalSolve: 15,
      createdAt: '10/10/2023',
      updatedAt: '12/10/2023',
    },
  ];
  return (
    <div style={{ height: '100%' }}>
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
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Search
              placeholder='Enter challenge ctf name'
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
                onClick={handleCreateChallenge}
              >
                Add
              </Button>
            </div>
          </div>
          <CollectionCreateForm
            open={openModal}
            item={item}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          ></CollectionCreateForm>
          <List
            itemLayout='vertical'
            size='large'
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.title} itemID={item.id}>
                <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
                <Row>
                  <Col span={18}>
                    <div>
                      <p className='d-inline'>
                        <span className='d-inline font-weight-bold mr-1'>
                          Content:
                        </span>
                        {item.content}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1rem',
                      }}
                      className='mt-1 mb-1'
                    >
                      <div>
                        <p className='d-inline mr-2 font-weight-bold'>
                          Level:{' '}
                        </p>
                        {item.level === 'easy' ? (
                          <Tag color='#87d068'>Easy</Tag>
                        ) : (
                          <></>
                        )}
                        {item.level === 'medium' ? (
                          <Tag color='#F4CE14'>Medium</Tag>
                        ) : (
                          <></>
                        )}
                        {item.level === 'hard' ? (
                          <Tag color='#f50'>Hard</Tag>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>
                        <TagOutlined style={{ color: '#F9B572' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Tag:{' '}
                        </p>
                        {item.tag}
                      </div>
                      <div>
                        <FlagOutlined style={{ color: '#362FD9' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Flag:{' '}
                        </p>
                        {item.flag}
                      </div>
                      <div>
                        <FireOutlined style={{ color: '#C70039' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Point:{' '}
                        </p>
                        {item.point}
                      </div>
                      <div>
                        <CheckOutlined style={{ color: '#1A5D1A' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Total Solved:{' '}
                        </p>
                        {item.totalSolve}
                      </div>
                    </div>
                    <div>
                      <BulbOutlined
                        style={{ color: '#F4CE14', fontSize: '1.1rem' }}
                      />
                      <p className='d-inline font-weight-bold ml-1'>Hint: </p>
                      {item.hint}
                    </div>
                  </Col>
                  <Col span={6} className='pl-5'>
                    <Button
                      className='mr-2'
                      type='primary'
                      style={{ backgroundColor: '#1AACAC' }}
                    >
                      Update
                    </Button>
                    <Button danger type='primary'>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ChallengeCTF;
