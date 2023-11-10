import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, List, Spin, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import { removeVietnameseTones } from '../../../utils/RemoveVietnameseTones';
import CollectionCreateForm from './collectionCreateForm';

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const getQuizData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8082/api/v1/quiz/all`);
      response.data.forEach((quiz) => {
        if (quiz.created_at !== null) {
          quiz.created_at = convertISOToCustomFormat(quiz.created_at);
        }
        if (quiz.updated_at !== null) {
          quiz.updated_at = convertISOToCustomFormat(quiz.updated_at);
        }
      });
      setQuizData(response.data);
      setSearchResult(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendDataCreateQuiz = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:8082/api/v1/quiz/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await getQuizData();
      message.success('Tạo mới bài trắc nghiệm thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  const sendUpdateQuiz = async (data, id) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image !== undefined) {
      formData.append('image', data.image);
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8082/api/v1/quiz/update/${id}`,
        formData
      );
      await getQuizData();
      message.success('Cập nhật bài trắc nghiệm thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      setIsLoading(false);
      return false;
    }
  };

  const deleteQuizById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/api/v1/quiz/${id}`
      );
      await getQuizData();
      message.success('Xóa bài trắc nghiệm thành công', 3);
      return true;
    } catch (error) {
      message.error('Có lỗi xảy ra');
      return false;
    }
  };

  useEffect(() => {
    getQuizData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleCreateQuiz = () => {
    setItem(null);
    setOpenModal(true);
  };

  const handleUpdateQuiz = (record) => {
    setOpenModal(true);
    setItem(record);
  };

  const handleDeleteQuizById = (quizID) => {
    if (deleteQuizById(quizID)) {
      setIsLoading(true);
    }
  };

  const onCreate = (values) => {
    if (values.image !== undefined) {
      values.image = values.image[0].originFileObj;
    }
    if (item === null) {
      sendDataCreateQuiz(values);
    } else {
      sendUpdateQuiz(values, item.id);
    }
    setOpenModal(false);
  };

  const handleSearch = (e) => {
    if (e.target.value !== '') {
      setSearchResult(
        quizData.filter((item) =>
          removeVietnameseTones(item.name.toLowerCase()).includes(
            removeVietnameseTones(e.target.value.toLowerCase())
          )
        )
      );
    } else {
      setSearchResult(quizData);
    }
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
            className='mb-5'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Search
              placeholder='Nhập tên bài trắc nghiệm'
              allowClear
              style={{ width: '20rem' }}
              onChange={handleSearch}
            />

            <div>
              <Button
                className='mr-3'
                type='primary'
                style={{ background: '#008170', width: '8rem' }}
                onClick={handleCreateQuiz}
              >
                Thêm mới
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
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            pagination={{
              pageSize: 6,
            }}
            dataSource={searchResult}
            renderItem={(item) => (
              <List.Item itemID={item.id}>
                <Card
                  className='border'
                  cover={
                    <img
                      src={`http://localhost:8082${item.image}`}
                      height={236}
                    />
                  }
                  actions={[
                    <Button
                      type='primary'
                      icon={<EditOutlined key='edit' />}
                      onClick={() => handleUpdateQuiz(item)}
                    />,
                    <Button
                      danger
                      icon={<DeleteOutlined key='delete' />}
                      onClick={() => {
                        handleDeleteQuizById(item.id);
                      }}
                    />,
                  ]}
                >
                  <Meta title={item.name} description={item.description} />
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;
