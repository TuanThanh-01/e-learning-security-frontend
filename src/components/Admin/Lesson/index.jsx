import React, { useEffect, useState } from 'react';
import { dataLesson } from '../../../utils/data';
import { Button, List, Spin, Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { CalendarOutlined } from '@ant-design/icons';
import CreateLesson from './createLesson';
import axios from 'axios';

const Lesson = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lessonData, setLessonData] = useState([]);
  const [item, setItem] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [categoryLessonData, setCategoryLessonData] = useState();

  const getCategoryLessonData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/category-lesson/get-all-category-lesson-name'
      );
      const arr = [];
      response.data.forEach((ele) => {
        arr.push({ value: ele, label: ele });
      });
      setCategoryLessonData(arr);
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra');
    }
  };

  const getLessonData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/api/v1/lesson/all'
      );
      setLessonData(response.data);
    } catch (error) {
      setIsLoading(false);
      message.error('Có lỗi xảy ra');
    }
  };

  const handleSearch = () => {};

  const handleCreateLesson = () => {
    setItem(null);
    setOpenModal(true);
  };

  useEffect(() => {
    getCategoryLessonData();
    getLessonData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const onCreate = (values) => {
    console.log(values);
  };

  return (
    <div style={{ height: '100vh' }}>
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
          <div className='mb-3'>
            <div
              style={{
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Search
                placeholder='Nhập tiêu đề bài học'
                allowClear
                style={{ width: '20rem' }}
                onChange={handleSearch}
              />
              <div>
                <Button
                  className='mr-3'
                  type='primary'
                  style={{ background: '#008170' }}
                  onClick={handleCreateLesson}
                >
                  Thêm mới bài học
                </Button>
              </div>
            </div>
          </div>
          <CreateLesson
            open={openModal}
            item={item}
            categoryLesson={categoryLessonData}
            onCreate={onCreate}
            onCancel={() => {
              setItem(null);
              setOpenModal(false);
            }}
          />
          <div>
            <List
              itemLayout='vertical'
              size='large'
              pagination={{ pageSize: 4 }}
              dataSource={dataLesson}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  extra={<img src={item.conver_image} width={272} />}
                  style={{ position: 'relative' }}
                  className='shadow-sm mb-3'
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
                      <p className='d-inline' style={{ fontSize: '13px' }}>
                        Đăng vào{' '}
                        <span className='font-weight-bold'>
                          {item.created_at}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 15,
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '65%',
                    }}
                  >
                    <div>
                      {item.category_lesson.map((item, index) => (
                        <Tag color='cyan' key={index}>
                          {item}
                        </Tag>
                      ))}
                    </div>
                    <div>
                      <Tag color='#2db7f5' style={{ cursor: 'pointer' }}>
                        Chỉnh sửa bài học
                      </Tag>
                      <Tag color='red-inverse' style={{ cursor: 'pointer' }}>
                        Xóa bài học
                      </Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;
