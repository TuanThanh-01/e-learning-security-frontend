import { Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RankingAllUser = ({ token }) => {
  const [userChallengeData, setUserChallengeData] = useState([]);

  const getUserChallengeData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/ranking/list-user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserChallengeData(response.data);
    } catch (error) {
      message.error('Có lỗi xảy ra!!!');
    }
  };

  useEffect(() => {
    getUserChallengeData();
  }, []);

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'student_identity',
      key: 'student_identity',
    },
    {
      title: 'Tổng điểm',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Tổng số bài đã thử',
      dataIndex: 'total_try',
      key: 'total_try',
    },
    {
      title: 'Tổng số bài làm đúng',
      dataIndex: 'total_correct',
      key: 'total_correct',
    },
    {
      title: 'Tổng số lần nộp bài',
      dataIndex: 'total_submit',
      key: 'total_submit',
    },
  ];

  return (
    <div
      style={{ borderRadius: '10px', backgroundColor: '#fff', height: 400 }}
      className='mt-3 border border-info p-1 shadow'
    >
      <Table
        columns={columns}
        dataSource={userChallengeData}
        pagination={false}
        virtual
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};

export default RankingAllUser;
