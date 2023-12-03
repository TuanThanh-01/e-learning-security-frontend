import { Button, Table, Tag } from 'antd';
import Modal from 'antd/es/modal/Modal';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const accessToken = JSON.parse(localStorage.getItem('user_data')).access_token;

const ChallengeCTFModal = ({ open, challengeCTFId, title, onCancel }) => {
  const [challengeCTFHistoryDetail, setChallengeCTFHistoryDetail] = useState(
    []
  );

  const getChallengeCTFHistoryDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/challenge-ctf-detail?challengeCTFId=${challengeCTFId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      response.data.forEach((challengeCTFDetail) => {
        if (challengeCTFDetail.created_at !== null) {
          challengeCTFDetail.created_at = convertISOToCustomFormat(
            challengeCTFDetail.created_at
          );
        }
      });
      setChallengeCTFHistoryDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (challengeCTFId != null) {
      getChallengeCTFHistoryDetail();
    }
  }, [challengeCTFId]);

  return (
    <Modal
      open={open}
      width={900}
      onCancel={onCancel}
      title=<h5 className='mb-4'>Lịch sử làm bài chi tiết: {title}</h5>
      footer={[
        <Button type='primary' onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Table
        bordered
        dataSource={challengeCTFHistoryDetail}
        pagination={false}
        scroll={{
          y: 500,
        }}
        columns={[
          { title: 'Mã sinh viên', dataIndex: 'student_identity' },
          { title: 'Họ tên', dataIndex: 'username' },
          { title: 'Tên thử thách CTF', dataIndex: 'title' },
          {
            title: 'Mức độ',
            dataIndex: 'level',
            render: (levelData) =>
              levelData === 'easy' ? (
                <Tag color='#87d068'>Dễ</Tag>
              ) : levelData === 'medium' ? (
                <Tag color='#F4CE14'>Trung bình</Tag>
              ) : levelData === 'hard' ? (
                <Tag color='#f50'>Khó</Tag>
              ) : (
                <></>
              ),
          },
          { title: 'Danh mục', dataIndex: 'tag' },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (statusSubmit) => (
              <span
                style={{
                  textTransform: 'capitalize',
                  color: statusSubmit === 'accept' ? '#52c41a' : '#dc3545',
                  fontWeight: 700,
                }}
              >
                {statusSubmit}
              </span>
            ),
          },
          { title: 'Thời gian nộp', dataIndex: 'created_at' },
        ]}
      />
    </Modal>
  );
};

export default ChallengeCTFModal;
