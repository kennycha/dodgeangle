import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const AllyAnalysisBlock = styled.div`
  height: 100%;
  background: ${palette.gray[3]};
`;

const AllyAnalysis = () => {
  return <AllyAnalysisBlock>AllyAnalysis</AllyAnalysisBlock>;
};

export default AllyAnalysis;
