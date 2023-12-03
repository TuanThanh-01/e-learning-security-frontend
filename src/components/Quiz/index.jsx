import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Card, Col, List, Row, Spin, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';

const ContainerHeight = 400;

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [historyResult, setHistoryResult] = useState([]);
  const [token, setToken] = useState('');

  const getHistoryData = async (access_token, userID) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/score/get-all-score-by-user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      response.data.forEach((history) => {
        if (history.created_at !== null) {
          history.created_at = convertISOToCustomFormat(history.created_at);
        }
      });
      setHistoryResult(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!', 3);
    }
  };

  const getQuizData = async (access_token) => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/quiz/all`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user_data'));
    setToken(user.access_token);
    getQuizData(user.access_token);
    getHistoryData(user.access_token, user.user_id);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
        <div
          style={{
            height: '100vh',
          }}
        >
          <div>
            <div
              className='mb-4 mt-3'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div className='ml-4'>
                <h4 style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                  Danh sách bài trắc nghiệm
                </h4>
              </div>
              <Search
                className='mr-4'
                placeholder='Nhập tên bài trắc nghiệm'
                allowClear
                style={{ width: '20rem' }}
                onChange={handleSearch}
              />
            </div>
            <List
              itemLayout='vertical'
              size='large'
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
              }}
              pagination={{
                pageSize: 4,
                style: { top: 0 },
              }}
              dataSource={searchResult}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Card
                    className='border'
                    cover={
                      <img
                        src={`http://localhost:8082${item.image}`}
                        height={236}
                      />
                    }
                  >
                    <Meta
                      title=<div>
                        <Link
                          to={`/viewQuiz/${item.name}`}
                          style={{
                            color: '#000',
                            textTransform: 'capitalize',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                          }}
                        >
                          {item.name}
                        </Link>
                      </div>
                      description={item.description}
                    />
                  </Card>
                </List.Item>
              )}
            />
            <div>
              <div className='ml-4'>
                <h4 style={{ fontWeight: '700', textTransform: 'capitalize' }}>
                  Lịch sử làm bài
                </h4>
              </div>
              <div className='container'>
                <List
                  style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    borderRadius: '10px',
                    transform: 'translateY(-3%)',
                  }}
                  className='shadow mt-4'
                >
                  <VirtualList
                    data={historyResult}
                    height={ContainerHeight}
                    itemHeight={47}
                    itemKey='email'
                  >
                    {(item) => (
                      <List.Item key={item.id} className='p-2'>
                        <Row style={{ width: '100%' }}>
                          <Col span={4}>
                            <p
                              style={{
                                fontWeight: 'lighter',
                              }}
                            >
                              {item.created_at}
                            </p>
                          </Col>
                          <Col span={4}>
                            <p
                              style={{
                                fontWeight: 500,
                                fontSize: '1.1rem',
                                textTransform: 'capitalize',
                              }}
                            >
                              {item.quiz.name}
                            </p>
                          </Col>
                          <Col span={4}>
                            <ClockCircleOutlined
                              style={{ color: '#5FBDFF', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span
                                className='mr-1'
                                style={{ textTransform: 'capitalize' }}
                              >
                                Thời gian:
                              </span>
                              {item.total_completion_time}
                            </p>
                          </Col>
                          <Col span={4}>
                            <CheckCircleOutlined
                              style={{ color: '#52c41a', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span className='mr-1'>Số Câu Đúng:</span>
                              {item.total_correct_answer}
                            </p>
                          </Col>
                          <Col span={4}>
                            <CloseCircleOutlined
                              style={{ color: '#dc3545', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span className='mr-1'>Số Câu Sai:</span>
                              {item.total_wrong_answer}
                            </p>
                          </Col>
                          <Col span={4}>
                            <TrophyOutlined
                              style={{ color: '#FFC436', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span className='mr-1'>Kết Quả:</span>
                              {item.score}
                            </p>
                          </Col>
                        </Row>
                        {/* <div
                          className='container mt-2 mb-2'
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                          }}
                        >
                          <div>
                            <p
                              style={{
                                display: 'inline',
                                fontWeight: 'lighter',
                              }}
                            >
                              {item.created_at}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontWeight: 500,
                                display: 'inline',
                                fontSize: '1.2rem',
                                textTransform: '',
                              }}
                            >
                              {item.quiz.name}
                            </p>
                          </div>

                          <div className='mt-1'>
                            <ClockCircleOutlined
                              style={{ color: '#5FBDFF', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span
                                className='mr-1'
                                style={{ textTransform: 'capitalize' }}
                              >
                                Thời gian:
                              </span>
                              {item.total_completion_time}
                            </p>
                          </div>

                          <div className='mt-1'>
                            <CheckCircleOutlined
                              style={{ color: '#52c41a', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span className='mr-1'>Số Câu Đúng:</span>
                              {item.total_correct_answer}
                            </p>
                          </div>
                          <div className='mt-1'>
                            <CloseCircleOutlined
                              style={{ color: '#dc3545', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span className='mr-1'>Số Câu Sai:</span>
                              {item.total_wrong_answer}
                            </p>
                          </div>
                          <div className='mt-1'>
                            <TrophyOutlined
                              style={{ color: '#FFC436', fontSize: '1rem' }}
                            />
                            <p
                              className='d-inline ml-2'
                              style={{ fontWeight: 500, fontSize: '1rem' }}
                            >
                              <span className='mr-1'>Kết Quả:</span>
                              {item.score}
                            </p>
                          </div>
                        </div> */}
                      </List.Item>
                    )}
                  </VirtualList>
                </List>
              </div>
            </div>
          </div>
        </div>
      )}
    </Content>
  );
};

export default Quiz;
