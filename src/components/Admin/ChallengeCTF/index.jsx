import {
  BulbOutlined,
  CheckOutlined,
  FlagOutlined,
  FireOutlined,
  TagOutlined,
  CalendarOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Button, Col, List, Row, Spin, Tag, message } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import CollectionCreateForm from './collectionCreateForm';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import axios from 'axios';

const ChallengeCTF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [challengeCTFData, setChallengeCTFData] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getChallengeCTFData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/challenge-ctf/all'
      );
      setChallengeCTFData(response.data);
      setIsLoading(false);
    } catch (error) {
      message.error('An error occur!');
    }
  };

  const sendDataCreateChallengeCTF = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('level', data.level);
    formData.append('tag', data.tag);
    formData.append('hint', data.hint);
    formData.append('flag', data.flag);
    formData.append('point', data.point);
    formData.append('file', data.file);
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8082/api/v1/challenge-ctf/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response);
      await getChallengeCTFData();
      message.success('Create challenge ctf success!', 3);
      return true;
    } catch (error) {
      message.error('An error occur!');
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    getChallengeCTFData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateChallenge = () => {
    setItem(null);
    setOpenModal(true);
  };

  const onCreate = (values) => {
    if (values.file !== undefined) {
      values.file = values.file[0].originFileObj;
    }
    if (item === null) {
      sendDataCreateChallengeCTF(values);
    } else {
      // sendUpdateChallengeCTF(values, item.id);
    }
    setOpenModal(false);
  };

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
            dataSource={challengeCTFData}
            renderItem={(item) => (
              <List.Item key={item.title} itemID={item.id} className='mt-3'>
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
                        {item.total_solve}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <CalendarOutlined style={{ color: '#706233' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Created At:{' '}
                        </p>
                        {convertISOToCustomFormat(item.created_at)}
                      </div>
                      <div>
                        <CalendarOutlined style={{ color: '#706233' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          Updated At:{' '}
                        </p>
                        {item.updated_at}
                      </div>
                      <div>
                        <FileOutlined style={{ color: '#1A5D1A' }} />
                        <p className='d-inline ml-1 mr-1 font-weight-bold'>
                          File Name:{' '}
                        </p>
                        {item.url_file}
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
                  <Col
                    span={6}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
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
