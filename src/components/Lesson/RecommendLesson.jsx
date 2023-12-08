import { CalendarOutlined } from '@ant-design/icons';
import { Card, Divider, Tag } from 'antd';
import React, { useState } from 'react';

const RecommendLesson = () => {
  const [lessonData, setLessonData] = useState([]);
  const elements = ['one', 'two', 'three'];

  return (
    <div>
      <Divider orientation='left' plain>
        <p
          style={{
            fontSize: '1.2rem',
          }}
        >
          Gợi ý bài học tiếp theo
        </p>
      </Divider>
      <div className=''>
        {elements.map((value, index) => (
          <Card
            size='small'
            title='Đây là tiêu đề 1'
            style={{ width: '88%' }}
            className='ml-3 mb-3 border border-info'
            key={index}
          >
            <p
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                lineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </p>
            <div className='d-flex'>
              <div>
                <CalendarOutlined
                  className='mr-2'
                  style={{ color: '#068FFF', fontSize: '1rem' }}
                />
                <p className='d-inline' style={{ fontSize: '13px' }}>
                  Đăng vào{' '}
                  <span className='font-weight-bold'>
                    Ngày 7 tháng 12 năm 2023
                  </span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendLesson;
