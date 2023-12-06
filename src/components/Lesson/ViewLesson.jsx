import { Col, Row, Spin, Tag, message } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import TableOfContent from './TableOfContent';

const ViewLesson = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lessonData, setLessonData] = useState({});

  const getLessonData = async (access_token) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/lesson/1`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.data.created_at !== null) {
        response.data.created_at = convertISOToCustomFormat(
          response.data.created_at
        );
      }
      if (response.data.updated_at !== null) {
        response.data.updated_at = convertISOToCustomFormat(
          response.data.updated_at
        );
      }

      setLessonData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 2);
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    getLessonData(user.access_token);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Content style={{ overflow: 'initial' }}>
      {isLoading ? (
        <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        />
      ) : (
        <Row
          style={{
            height: '100vh',
          }}
        >
          <Col span={5}>
            <TableOfContent />
          </Col>
          <Col className='mt-3' span={13}>
            <div className='ml-3'>
              <h1 style={{ fontSize: '1.8rem' }} className='mb-3'>
                {lessonData.title}
              </h1>
              <div>
                <span
                  className='mr-2'
                  style={{ fontSize: '1rem', fontWeight: 600 }}
                >
                  Danh mục:
                </span>
                {lessonData.category_lesson.map((item) => (
                  <Tag color='blue'>{item}</Tag>
                ))}
              </div>
              <div className='mt-2'>
                <span
                  className='mr-1'
                  style={{ fontSize: '0.9rem', fontWeight: 600 }}
                >
                  Cập nhật lúc:{' '}
                </span>
                <span style={{ fontWeight: 100 }}>
                  {lessonData.updated_at
                    ? lessonData.updated_at
                    : lessonData.created_at}
                </span>
              </div>
            </div>
            <hr style={{ width: '96%' }} />
            <div className='ql-snow'>
              <div
                className='ql-editor'
                dangerouslySetInnerHTML={{ __html: lessonData.content }}
              ></div>
            </div>
          </Col>
          <Col span={6}></Col>
        </Row>
      )}
    </Content>
  );
};

export default ViewLesson;
