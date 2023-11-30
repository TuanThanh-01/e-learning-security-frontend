import { Button, Col, Row, Spin, Table } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import convertISOToCustomFormat from '../../../utils/ConvertDate';
import HistorySubmitChallengeCTF from './HistorySubmitChallengeCTF';
import StatisticOverview from './StatisticOverview';

const StatisticChallengeCTF = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [historySubmitChallengeCTFData, setHistorySubmitChallengeCTFData] =
    useState([]);
  const [
    statisticChallengeCTFOverviewData,
    setStatisticChallengeCTFOverviewData,
  ] = useState({});
  const [tagTotalSubmitData, setTagTotalSubmitData] = useState([]);
  const [tagTotalCompletedData, setTagTotalCompletedData] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  const getHistorySubmitChallengeCTFData = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const getStatisticChallengeCTFOverviewData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/challenge-ctf-overview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatisticChallengeCTFOverviewData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTagTotalCompletedData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/tag-total-complete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTagTotalCompletedData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTagTotalSubmitData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/statistic/tag-total-submit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTagTotalSubmitData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistorySubmitChallengeCTFData();
    getStatisticChallengeCTFOverviewData();
    getTagTotalCompletedData();
    getTagTotalSubmitData();
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
        <>
          <StatisticOverview
            statisticChallengeCTFOverview={statisticChallengeCTFOverviewData}
            tagTotalSubmitData={tagTotalSubmitData}
          />
          <Row className='mt-5'>
            <Col span={24}>
              <h5 style={{ fontWeight: 700 }}>Thống kê theo người dùng</h5>
              <HistorySubmitChallengeCTF
                historySubmitChallengeCTFData={historySubmitChallengeCTFData}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default StatisticChallengeCTF;
