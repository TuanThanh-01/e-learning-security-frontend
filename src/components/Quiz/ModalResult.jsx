import { Button, List, Modal } from 'antd';
import React, { useEffect } from 'react';

const ModalResult = ({ open, score, timeFinish, review }) => {
  useEffect(() => {
    console.log(review);
  }, []);
  return (
    <Modal
      width={800}
      open={open}
      title='Kết quả bài làm'
      footer={[
        <Button key='retry' type='primary'>
          Làm lại
        </Button>,
        <Button key='back'>Trở về</Button>,
      ]}
    >
      <p>{score}</p>
      <p>{timeFinish}</p>
      <List
        bordered
        dataSource={review}
        renderItem={(item) => (
          <List.Item>
            {item.question_title} {item.user_choose}
            {item.correct_answer}
          </List.Item>
        )}
      />
    </Modal>
  );
};

export default ModalResult;
