import { Card, List, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../utils/ConvertDate';
import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';
import { dataQuiz } from '../../utils/data';

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

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

  useEffect(() => {
    getQuizData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
                <List.Item itemID={item.id}>
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
                        <h5>{item.name}</h5>
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
              <div></div>
            </div>
          </div>
        </div>
      )}
    </Content>
  );
};

export default Quiz;
