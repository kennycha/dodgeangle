import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const ChampionRecommendBlock = styled.div`
  height: 100%;
  background: ${palette.green[3]};
`;

const ChampionRecommend = () => {
  return <ChampionRecommendBlock>ChampionRecommend</ChampionRecommendBlock>;
};

export default ChampionRecommend;
