import { CalendarOutlined } from '@ant-design/icons';
import { List, Spin, Tag } from 'antd';
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
                  style={{ position: 'relative' }}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className='d-flex'>
                    <div>
                      <CalendarOutlined
                        className='mr-2'
                        style={{ color: '#068FFF', fontSize: '1rem' }}
                      />
                      <p
                        className='d-inline font-italic'
                        style={{ fontSize: '13px' }}
                      >
                        {item.created_at}
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
      )}
    </Content>
  );
};

export default Lesson;
