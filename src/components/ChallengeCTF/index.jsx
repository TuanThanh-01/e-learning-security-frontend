import {
  BarChartOutlined,
  CheckSquareOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { Card, Col, List, Menu, Progress, Row, Spin, Tag, message } from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import SingleChallengeCTF from './SingleChallengeCTF';

const { SubMenu } = Menu;

const ChallengeCTF = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [dataChallengeCTF, setDataChallengeCTF] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [singleChallengeCTFData, setSingleChallengeCTFData] = useState({});
  const [token, setToken] = useState('');
  const [searchText, setSearchedText] = useState('');
  const [userId, setUserId] = useState('');

  const getChallengeCTFData = async (access_token) => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/challenge-ctf/all',
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      setDataChallengeCTF(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra');
    }
  };

  const listData = useMemo(() => {
    return dataChallengeCTF.reduce((prev, cur) => {
      if (
        String(cur.title).toLowerCase().includes(searchText.toLowerCase()) &&
        String(cur.level).toLowerCase().includes(currentLevel.toLowerCase()) &&
        String(cur.tag).toLowerCase().includes(currentCategory.toLowerCase())
      ) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }, [dataChallengeCTF, currentLevel, currentCategory, searchText]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleDoChallengeCTF = (item) => {
    setOpenModal(true);
    setSingleChallengeCTFData(item);
  };

  const handleOnClickCategory = (e) => {
    setCurrentCategory(e.key);
  };

  const handleOnClickLevel = (e) => {
    setCurrentLevel(e.key);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    setUserId(user.user_id);
    getChallengeCTFData(user.access_token);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Content style={{ overflow: 'initial' }}>
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
        <div style={{ height: '100vh' }}>
          <div className='container'>
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                height: '5rem',
              }}
              className='shadow-sm mt-3'
            >
              <div
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <h3
                  style={{ color: '#dc3545', fontWeight: 700 }}
                  className='mt-4 ml-4'
                >
                  PTIT CTF Challenge
                </h3>
                <h4
                  className='mt-4 mr-4'
                  style={{ color: '#0766AD', fontWeight: 700 }}
                >
                  Điểm: 1240
                </h4>
              </div>
            </div>
            <SingleChallengeCTF
              open={openModal}
              onCancel={handleCancel}
              singleChallengeCTFData={singleChallengeCTFData}
              token={token}
              userID={userId}
            />
            <Menu
              className='mt-3'
              mode='inline'
              style={{ borderRadius: '10px' }}
            >
              <SubMenu
                key='SubMenu'
                icon={<BarChartOutlined style={{ fontSize: '1.7rem' }} />}
                title=<p
                  className='mt-3'
                  style={{
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#0766AD',
                  }}
                >
                  Theo Dõi Tiến Độ Bài Làm
                </p>
              >
                <Menu.Item key='web'>
                  <div
                    className='mt-3'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Web Exploitation
                      </p>
                    </div>
                    <div className='mr-4' style={{ width: '500px' }}>
                      <Progress percent={30} status='active' />
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item key='forensics'>
                  <div
                    className='mt-3'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Forensics
                      </p>
                    </div>
                    <div className='mr-4' style={{ width: '500px' }}>
                      <Progress percent={25} status='active' />
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item key='binary'>
                  <div
                    className='mt-3'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Binary Exploitation
                      </p>
                    </div>
                    <div className='mr-4' style={{ width: '500px' }}>
                      <Progress percent={40} status='active' />
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item key='reverse'>
                  <div
                    className='mt-3'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Reverse Engineering
                      </p>
                    </div>
                    <div className='mr-4' style={{ width: '500px' }}>
                      <Progress percent={60} status='active' />
                    </div>
                  </div>
                </Menu.Item>

                <Menu.Item key='cryptography'>
                  <div
                    className='mt-3'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Cryptography
                      </p>
                    </div>
                    <div className='mr-4' style={{ width: '500px' }}>
                      <Progress percent={70} status='active' />
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Item key='miscellaneous'>
                  <div
                    className='mt-3'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Miscellaneous
                      </p>
                    </div>
                    <div className='mr-4' style={{ width: '500px' }}>
                      <Progress percent={50} status='active' />
                    </div>
                  </div>
                </Menu.Item>
                <Menu.Divider className='mt-2 mb-2' />
                <Menu.Item key='all'>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <p style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Tất Cả
                      </p>
                    </div>
                    <div className='mr-4' style={{ width: '500px' }}>
                      <Progress percent={50} status='active' />
                    </div>
                  </div>
                </Menu.Item>
              </SubMenu>
            </Menu>
            <Row className='mt-4'>
              <Col
                className='pb-4'
                span={8}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                }}
              >
                <div className='ml-4 mr-4'>
                  <p
                    className='mt-1'
                    style={{ fontSize: '1.3rem', fontWeight: 700 }}
                  >
                    Lọc & Tìm kiếm
                  </p>

                  <div className='mt-4'>
                    <p
                      style={{
                        fontSize: '1rem',
                        marginBottom: '6px',
                        fontWeight: 600,
                      }}
                      className='mb-3'
                    >
                      Tìm kiếm theo tên
                    </p>
                    <Search
                      placeholder='Nhập tên thử thách ctf'
                      allowClear
                      onChange={(e) => {
                        setSearchedText(e.target.value);
                      }}
                    />
                  </div>
                  <div className='mt-3'>
                    <p
                      style={{
                        fontSize: '1rem',
                        marginBottom: '6px',
                        fontWeight: 600,
                      }}
                      className='mb-3'
                    >
                      Lọc theo mức độ
                    </p>
                    <Menu
                      className='border'
                      selectedKeys={[currentLevel]}
                      onClick={handleOnClickLevel}
                      style={{ borderRadius: '10px' }}
                      items={[
                        {
                          label: 'Tất cả',
                          key: '',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Dễ',
                          key: 'easy',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Trung bình',
                          key: 'medium',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Khó',
                          key: 'hard',
                        },
                      ]}
                    />
                  </div>
                  <div className='mt-3'>
                    <p
                      style={{
                        fontSize: '1rem',
                        marginBottom: '6px',
                        fontWeight: 600,
                      }}
                      className='mb-3'
                    >
                      Lọc theo danh mục
                    </p>
                    <Menu
                      className='border'
                      selectedKeys={[currentCategory]}
                      onClick={handleOnClickCategory}
                      style={{ borderRadius: '10px' }}
                      items={[
                        {
                          label: 'Tất cả',
                          key: '',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Web Exploitation',
                          key: 'web',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Forensics',
                          key: 'forensics',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Binary Exploitation',
                          key: 'binary',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Reverse Engineering',
                          key: 'reverse',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Cryptography',
                          key: 'cryptography',
                        },
                        {
                          type: 'divider',
                        },
                        {
                          label: 'Misellaneous',
                          key: 'misellaneous',
                        },
                      ]}
                    />
                  </div>
                </div>
              </Col>
              <Col span={16}>
                <List
                  pagination={{ pageSize: 6 }}
                  itemLayout='vertical'
                  size='large'
                  className='ml-2'
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 1,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                  }}
                  dataSource={listData}
                  renderItem={(item) => (
                    <List.Item onClick={() => handleDoChallengeCTF(item)}>
                      <Card
                        className='mb-5 shadow-sm'
                        style={{
                          width: 340,
                          cursor: 'pointer',
                        }}
                        title={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div style={{ fontSize: '1.1rem' }}>
                              {item.title}
                            </div>
                          </div>
                        }
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: 60,
                          }}
                        >
                          <div>
                            <FireOutlined style={{ color: '#C70039' }} />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500 }}
                            >
                              Điểm: <span>{item.point}</span>
                            </p>
                          </div>
                          <div>
                            <CheckSquareOutlined
                              style={{ color: 'green', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500 }}
                            >
                              Số Lượt đã làm: <span>{item.total_solve}</span>
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Tag
                            color='cyan'
                            style={{ textTransform: 'capitalize' }}
                          >
                            {item.tag}
                          </Tag>
                          <div>
                            {item.level === 'easy' ? (
                              <Tag
                                color='green'
                                className='text-center'
                                style={{ width: '4.5rem' }}
                              >
                                Dễ
                              </Tag>
                            ) : (
                              <></>
                            )}
                            {item.level === 'medium' ? (
                              <Tag color='gold'>Trung bình</Tag>
                            ) : (
                              <></>
                            )}
                            {item.level === 'hard' ? (
                              <Tag
                                color='red'
                                className='text-center'
                                style={{ width: '4.5rem' }}
                              >
                                Khó
                              </Tag>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Content>
  );
};

export default ChallengeCTF;
