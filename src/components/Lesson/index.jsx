import { CalendarOutlined } from '@ant-design/icons';
import { Col, List, Row, Spin, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import { dataLesson } from '../../utils/data';
import { convertDateVnCustom } from '../../utils/ConvertDateVn';
import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';

const Lesson = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(dataLesson);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  const handleSearch = (e) => {
    if (e.target.value !== '') {
      setData(
        dataLesson.filter((item) =>
          removeVietnameseTones(item.title.toLowerCase()).includes(
            removeVietnameseTones(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setData(dataLesson);
    }
  };

  return (
    <Content style={{ overflow: 'initial' }} className='p-3'>
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
        <div>
          <div
            className='mb-3'
            style={{ display: 'flex', justifyContent: 'end' }}
          >
            <div>
              <Search
                placeholder='Nhập tiêu đề bài học'
                allowClear
                style={{ width: '20rem' }}
                onChange={handleSearch}
              />
            </div>
          </div>
          <Row style={{ display: 'flex' }}>
            <Col span={16} className='ml-2'>
              <h4 style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                Danh sách bài học
              </h4>
              <div
                className='mt-4'
                style={{
                  height: '100vh',
                }}
              >
                <div>
                  <List
                    itemLayout='vertical'
                    size='large'
                    pagination={{ pageSize: 4 }}
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        extra={<img src={item.conver_image} width={272} />}
                        style={{
                          position: 'relative',
                          backgroundColor: '#fff',
                          borderRadius: '10px',
                        }}
                        className='shadow-sm mb-3 border'
                      >
                        <List.Item.Meta
                          title=<div>
                            <h5>{item.title}</h5>
                          </div>
                          description={item.description}
                        />
                        <div className='d-flex'>
                          <div>
                            <CalendarOutlined
                              className='mr-2'
                              style={{ color: '#068FFF', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline'
                              style={{ fontSize: '13px' }}
                            >
                              Đăng vào{' '}
                              <span className='font-weight-bold'>
                                {item.created_at}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: 15 }}>
                          {item.category_lesson.map((item) => (
                            <Tag color='cyan'>{item}</Tag>
                          ))}
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col span={7} className='ml-5'>
              <h4 style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                Bài học đã xem gần đây
              </h4>
              <div
                className='mt-4'
                style={{
                  height: '100vh',
                }}
              >
                <div>
                  <List
                    itemLayout='vertical'
                    size='large'
                    dataSource={data.slice(0, 4)}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        extra={<img src={item.conver_image} width={150} />}
                        style={{
                          position: 'relative',
                          backgroundColor: '#fff',
                          borderRadius: '10px',
                        }}
                        className='shadow-sm mb-3 border'
                      >
                        <List.Item.Meta
                          title=<div>
                            <h5>{item.title}</h5>
                          </div>
                          description=<p
                            style={{
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              lineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {item.description}
                          </p>
                        />
                        <div className='d-flex'>
                          <div style={{ marginBottom: '6px' }}>
                            <CalendarOutlined
                              className='mr-2'
                              style={{ color: '#068FFF', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline'
                              style={{ fontSize: '13px' }}
                            >
                              Đăng vào{' '}
                              <span className='font-weight-bold'>
                                {item.created_at}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className='mt-2'>
                          {item.category_lesson.map((item) => (
                            <Tag color='cyan'>{item}</Tag>
                          ))}
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Content>
  );
};

export default Lesson;
