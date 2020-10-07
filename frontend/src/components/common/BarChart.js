import React from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';
import mainTheme from '../../lib/styles/mainTheme';
import palette from '../../lib/styles/palette';

const SUBCHART = {
  show: false,
};

const STYLE = {
  height: `180px`,
  width: `350px`,
  color: `${mainTheme.mainBackground}`,
  background: `${palette.gray[1]}`,
  borderRadius: `15px`,
  marginLeft: '5px',
  marginRight: '5px',
};

const AXIS = {
  axis: 'none',
};

const BarChart = ({ allyRate, enemyRate }) => {
  const columns = [
    ['아군', parseFloat(allyRate)],
    ['적군', parseFloat(enemyRate)],
  ];
  const chartData = {
    columns: columns,
    type: 'bar',
  };
  return allyRate && enemyRate ? (
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

export default BarChart;
