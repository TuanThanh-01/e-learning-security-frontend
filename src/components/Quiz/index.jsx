import { Card, List, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';
import { dataQuiz } from '../../utils/data';
import VirtualList from 'rc-virtual-list';
import { Avatar, message } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ContainerHeight = 400;

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [historyResult, setHistoryResult] = useState(dataQuiz);

  const getQuizData = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuizData();
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
                        <div
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
                              className='mr-3'
                            >
                              {item.created_at}
                            </p>
                            <p
                              style={{
                                fontWeight: 700,
                                display: 'inline',
                                fontSize: '1.2rem',
                              }}
                            >
                              {item.quizName}
                            </p>
                          </div>
                          <div>
                            <TrophyOutlined
                              style={{ color: '#FFC436', fontSize: '1.2rem' }}
                            />
                            <p
                              className='d-inline ml-3'
                              style={{ fontWeight: 500, fontSize: '1.2rem' }}
                            >
                              {item.score}
                            </p>
                          </div>
                        </div>
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
