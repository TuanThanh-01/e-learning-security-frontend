import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const QuizScoreChart = ({ quizScoreData }) => {
  const [quizScore, setQuizScore] = useState({
    labels: quizScoreData.map((data) => data.quiz_title),
    datasets: [
      {
        label: 'Điểm trung bình',
        data: quizScoreData.map((data) => data.avg_value),
        backgroundColor: ['#7ED7C1'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  });
  return <Bar data={quizScore} />;
};

export default QuizScoreChart;
