import { Button, Card, Input, List, Select, Space, Spin, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { dataCTF } from '../../utils/data';
import { CheckOutlined, SketchOutlined } from '@ant-design/icons';

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
                    className='shadow mb-5 border'
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
      )}
    </Content>
  );
};

export default ChallengeCTF;
