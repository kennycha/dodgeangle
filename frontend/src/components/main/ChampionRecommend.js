import React from 'react';
import styled from 'styled-components';
import mainTheme from '../../lib/styles/mainTheme';

const ChampionRecommendBlock = styled.div`
  height: 100%;
  background: ${mainTheme.mainAnalysis};
  border: ${2 / 16}rem solid ${mainTheme.mainBorder};
`;

const ChampionRecommend = ({ me, allchampion }) => {
  return (
    <ChampionRecommendBlock>
      {me.recommendChamp &&
        allchampion &&
        me.recommendChamp.map((id) => (
          <div>{allchampion.find((champion) => champion.id === id).name}</div>
        ))}
    </ChampionRecommendBlock>
  );
};

export default ChampionRecommend;
