import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const EnemyAnalysisBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainAnalysis};
  border: 2px solid ${mainTheme.mainBorder};
`;

const EnemyAnalysis = () => {
  return <EnemyAnalysisBlock>EnemyAnalysis</EnemyAnalysisBlock>;
};

export default EnemyAnalysis;
