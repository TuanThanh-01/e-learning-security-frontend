import { Content } from 'antd/es/layout/layout';
import React from 'react';

const Quiz = () => {
  return (
    <Content style={{ overflow: 'initial' }}>
      <div
        style={{
          padding: 24,
          height: '100%',
          overflowY: 'auto',
        }}
      >
        Quiz
      </div>
    </Content>
  );
};

export default Quiz;
