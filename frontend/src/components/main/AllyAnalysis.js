import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const AllyAnalysisBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainAnalysis};
  border: 2px solid ${mainTheme.mainBorder};
`;

const AllyAnalysis = () => {
  return <AllyAnalysisBlock>AllyAnalysis</AllyAnalysisBlock>;
};

export default AllyAnalysis;
