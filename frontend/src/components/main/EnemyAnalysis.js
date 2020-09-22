import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const EnemyAnalysisBlock = styled.div`
  height: 100%;
  background: ${palette.red[3]};
`;

const EnemyAnalysis = () => {
  return <EnemyAnalysisBlock>EnemyAnalysis</EnemyAnalysisBlock>;
};

export default EnemyAnalysis;
