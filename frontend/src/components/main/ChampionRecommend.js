import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const ChampionRecommendBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainAnalysis};
  border: 2px solid ${mainTheme.mainBorder};
`;

const ChampionRecommend = () => {
  return <ChampionRecommendBlock>ChampionRecommend</ChampionRecommendBlock>;
};

export default ChampionRecommend;
