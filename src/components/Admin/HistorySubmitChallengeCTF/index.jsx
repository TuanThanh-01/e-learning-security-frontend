import { Button, Spin, Table } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';

const HistorySubmitChallengeCTF = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [historySubmitChallengeCTFData, setHistorySubmitChallengeCTFData] =
    useState([]);
  const [searchedText, setSearchedText] = useState('');

  const getHistorySubmitChallengeCTFData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/history-submit/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response.data.forEach((historySubmit) => {
        if (historySubmit.created_at !== null) {
          historySubmit.created_at = convertISOToCustomFormat(
            historySubmit.created_at
          );
        }
      });
      setHistorySubmitChallengeCTFData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistorySubmitChallengeCTFData();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

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
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Search
              placeholder='Nhập mã sinh viên hoặc tiêu đề bài ctf'
              allowClear
              style={{ width: '20rem' }}
              onSearch={(value) => {
                setSearchedText(value);
              }}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />
          </div>

          <Table
            rowKey={(record) => record.id}
            columns={[
              { title: 'ID', dataIndex: 'id' },
              {
                title: 'Mã sinh viên',
                dataIndex: 'user_identity',
                render: (data) => (
                  <span style={{ fontWeight: 600 }}>{data}</span>
                ),
                filteredValue: [searchedText],
                onFilter: (value, record) => {
                  return (
                    String(record.user_identity)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase()) ||
                    String(record.challenge_ctf_title)
                      .toLocaleLowerCase()
                      .includes(value.toLocaleLowerCase())
                  );
                },
              },
              {
                title: 'Tiêu đề thử thách CTF',
                dataIndex: 'challenge_ctf_title',
              },
              {
                title: 'Đáp án',
                dataIndex: 'flag',
                render: (flag) => (
                  <span style={{ color: '#0766AD', fontWeight: 600 }}>
                    {flag}
                  </span>
                ),
              },
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
              {
                title: 'Thời gian nộp',
                dataIndex: 'created_at',
              },
            ]}
            dataSource={historySubmitChallengeCTFData}
          />
        </div>
      )}
    </div>
  );
};

export default HistorySubmitChallengeCTF;
