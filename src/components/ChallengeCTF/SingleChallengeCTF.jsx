import { CheckCircleTwoTone, FireOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Input,
  Modal,
  Row,
  Space,
  Tag,
  message,
} from 'antd';
import React, { useState } from 'react';

const SingleChallengeCTF = ({ open, onCancel, singleChallengeCTFData }) => {
  const [flag, setFlag] = useState('');
  const isTrue = true;

  const handleChangeFlagInput = (e) => {
    setFlag(e.target.value);
  };

  const handleSubmitFlag = () => {
    const flagSubmit = `CTF_PTIT_FLAG{${flag}}`;
    if (flagSubmit === singleChallengeCTFData.flag) {
      message.success(
        `Yayyy! Bạn nhận được ${singleChallengeCTFData.point} điểm`,
        3
      );
    } else {
      message.error(`Cờ nhập chưa chính xác, hãy thử lại`, 3);
    }
  };

  return (
    <Modal
      width={700}
      open={open}
      title=<div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h5>{singleChallengeCTFData.title}</h5>
        <div>
          <CheckCircleTwoTone
            className='mr-4'
            twoToneColor={isTrue ? '#52c41a' : '#D0D4CA'}
            style={{ fontSize: '1.6rem' }}
          />
        </div>
      </div>
      onCancel={onCancel}
      footer={null}
    >
      <div
        className='mt-4'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.2rem',
        }}
      >
        <div>
          <p className='d-inline mr-2'>Mức độ: </p>
          {singleChallengeCTFData.level === 'easy' ? (
            <Tag
              color='green'
              className='text-center'
              style={{ width: '4.5rem' }}
            >
              Dễ
            </Tag>
          ) : (
            <></>
          )}
          {singleChallengeCTFData.level === 'medium' ? (
            <Tag color='gold'>Trung bình</Tag>
          ) : (
            <></>
          )}
          {singleChallengeCTFData.level === 'hard' ? (
            <Tag
              color='red'
              className='text-center'
              style={{ width: '4.5rem' }}
            >
              Khó
            </Tag>
          ) : (
            <></>
          )}
        </div>
        <div>
          <FireOutlined style={{ color: '#C70039' }} />
          <p className='d-inline ml-2' style={{ fontWeight: 500 }}>
            Điểm: <span>{singleChallengeCTFData.point}</span>
          </p>
        </div>
      </div>
      <Divider style={{ backgroundColor: '#D8D9DA' }} />
      <Row>
        <Col span={16}>
          <div>
            <p style={{ fontSize: '1.2rem', marginBottom: 5 }}>Mô tả</p>
            <p>{singleChallengeCTFData.content}</p>
            {singleChallengeCTFData.urlFile}
          </div>
        </Col>
        <Col span={8}>
          <Collapse
            size='small'
            items={[
              {
                key: '1',
                label: 'Gợi ý',
                children: <p>{singleChallengeCTFData.hint}</p>,
              },
            ]}
          />
        </Col>
      </Row>
      <Space className='mt-5' style={{ width: '100%' }}>
        <Input
          placeholder='Nhập cờ'
          style={{ width: '500px' }}
          value={flag}
          onChange={handleChangeFlagInput}
        />
        <Button
          type='primary'
          style={{ width: '80px' }}
          onClick={handleSubmitFlag}
        >
          Nộp
        </Button>
      </Space>
      <Divider style={{ backgroundColor: '#D8D9DA' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span className='mr-2' style={{ fontWeight: 600 }}>
            Danh mục:
          </span>
          <Tag color='cyan'>{singleChallengeCTFData.tag}</Tag>
        </div>
        <div>
          <p style={{ fontWeight: 600 }}>
            <span>Số lượt đã làm: </span>
            {singleChallengeCTFData.total_solve}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SingleChallengeCTF;
