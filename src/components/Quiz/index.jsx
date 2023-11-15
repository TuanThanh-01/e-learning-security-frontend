import { List, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { dataQuiz } from "../../utils/data";

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <Content style={{ overflow: "initial" }}>
      {isLoading ? (
        <Spin
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        />
      ) : (
        <div
          style={{
            height: "100vh",
          }}
        >
          <List />
        </div>
      )}
    </Content>
  );
};

export default Quiz;
