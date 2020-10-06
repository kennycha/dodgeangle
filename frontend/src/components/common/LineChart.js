import React from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';
import mainTheme from '../../lib/styles/mainTheme';

const SUBCHART = {
  show: false,
};

const STYLE = {
  height: `120px`,
  width: `500px`,
  color: `${mainTheme.mainFontColor}`,
  background: `${mainTheme.mainLogoColor}`,
  borderRadius: `15px`,
};

const AXIS = {
  axis: 'none',
};

const LineChart = ({ data, label }) => {
  const columns = [[label, ...data]];
  const chartData = {
    columns: columns,
    type: 'line',
  };
  return data ? (
    <BillboardChart
      data={chartData}
      subchart={SUBCHART}
      style={STYLE}
      axis={AXIS}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default LineChart;
