import React from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const SUBCHART = {
  show: false,
};

const STYLE = {
  height: `120px`,
  width: `600px`,
};

const LineChart = ({ data, label }) => {
  const columns = [[label, ...data]];
  const chartData = {
    columns: columns,
    type: 'line',
  };
  return (
    data && (
      <BillboardChart data={chartData} subchart={SUBCHART} style={STYLE} />
    )
  );
};

export default LineChart;
