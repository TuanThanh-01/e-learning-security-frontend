import {
  Button,
  Card,
  Dropdown,
  Input,
  Layout,
  List,
  Menu,
  Progress,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  message,
} from 'antd';
import Search from 'antd/es/input/Search';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { dataCTF } from '../../utils/data';
import {
  BarChartOutlined,
  CheckOutlined,
  DownOutlined,
  SettingOutlined,
  SketchOutlined,
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';

const { SubMenu } = Menu;

const ChallengeCTF = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleSearch = () => {};

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <Content style={{ overflow: 'initial' }}>
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
                className='mt-4 ml-5'
              >
                PTIT CTF Challenge
              </h3>
              <h4
                className='mt-4 mr-5'
                style={{ color: '#0766AD', fontWeight: 700 }}
              >
                Điểm: 1240
              </h4>
            </div>
          </div>
          <Menu className='mt-3' mode='inline' style={{ borderRadius: '10px' }}>
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
              <hr style={{ width: '91%', marginTop: 0, marginBottom: 0 }} />
              <Menu.Item key='all'>
                <div
                  className='mt-3'
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <p style={{ fontSize: '1rem', fontWeight: 600 }}>Tất Cả</p>
                  </div>
                  <div className='mr-4' style={{ width: '500px' }}>
                    <Progress percent={50} status='active' />
                  </div>
                </div>
              </Menu.Item>
            </SubMenu>
          </Menu>
          <Layout hasSider>
            <Sider style={{ backgroundColor: '#F5F5F5' }}>Sider</Sider>
            <Content>Content</Content>
          </Layout>
        </div>
      </div>
      {/* {isLoading ? (
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
        <div
          className='mt-4 container'
          style={{
            height: '100vh',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Space>
              <Space.Compact>
                <Input
                  defaultValue='Mức độ'
                  style={{ width: '30%', fontWeight: 'bold', color: '#000' }}
                  disabled
                />
                <Select
                  defaultValue=''
                  style={{ width: '7rem' }}
                  // onChange={(value) => setSelectedLevel(value)}

                  options={[
                    { value: '', label: '---Tất cả---' },
                    { value: 'easy', label: 'Dễ' },
                    { value: 'medium', label: 'Trung bình' },
                    { value: 'hard', label: 'Khó' },
                  ]}
                />
              </Space.Compact>
              <Space.Compact>
                <Input
                  defaultValue='Chủ đề'
                  style={{ width: '30%', fontWeight: 'bold', color: '#000' }}
                  disabled
                />
                <Select
                  defaultValue=''
                  style={{ width: '10.5rem' }}
                  // onChange={(value) => setSelectedTag(value)}
                  options={[
                    { value: '', label: '---Tất cả---' },
                    { value: 'web', label: 'Web' },
                    { value: 'forensics', label: 'Forensics' },
                    { value: 'binary', label: 'Binary' },
                    {
                      value: 'reverse engineering',
                      label: 'Reverse Engineering',
                    },
                    { value: 'cryptography', label: 'Cryptography' },
                    { value: 'miscellaneous', label: 'Miscellaneous' },
                  ]}
                />
              </Space.Compact>
              <Search
                placeholder='Nhập tiêu đề thử thách ctf'
                allowClear
                style={{ width: '15rem' }}
                className='ml-2'
                onChange={handleSearch}
              />
            </Space>
          </div>
          <div className='mt-5'>
            <List
              pagination={{ pageSize: 10 }}
              itemLayout='vertical'
              size='large'
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
              dataSource={dataCTF}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>{item.title}</div>
                        {item.level === 'easy' ? (
                          <Tag
                            color='green-inverse'
                            className='text-center'
                            style={{ width: '4.5rem' }}
                          >
                            Dễ
                          </Tag>
                        ) : (
                          <></>
                        )}
                        {item.level === 'medium' ? (
                          <Tag color='gold-inverse'>Trung bình</Tag>
                        ) : (
                          <></>
                        )}
                        {item.level === 'hard' ? (
                          <Tag
                            color='red-inverse'
                            className='text-center'
                            style={{ width: '4.5rem' }}
                          >
                            Khó
                          </Tag>
                        ) : (
                          <></>
                        )}
                      </div>
                    }
                    className='shadow mb-5 border border-danger'
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <SketchOutlined style={{ color: '#39A7FF' }} />
                        <p
                          className='d-inline ml-2'
                          style={{ fontWeight: 500 }}
                        >
                          Điểm: <span>{item.point}</span>
                        </p>
                      </div>
                      <div>
                        <CheckOutlined
                          style={{ color: 'green', fontSize: '1rem' }}
                        />
                        <p
                          className='d-inline ml-2'
                          style={{ fontWeight: 500 }}
                        >
                          Đã làm: <span>{item.total_solve}</span>
                        </p>
                      </div>
                      <div>
                        <Tag color='cyan'>{item.tag}</Tag>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      )} */}
    </Content>
  );
};

export default ChallengeCTF;
